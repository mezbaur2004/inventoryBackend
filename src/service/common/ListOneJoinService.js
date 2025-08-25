const ListOneJoinService = async (Request, DataModel, SearchArray, JoinStage) => {
    try {
        let pageNo = Number(Request.params.pageNo) || 1; // Default to page 1 if pageNo is not provided
        let perPage = Number(Request.params.perPage) || 20; // Default to 20 if perPage is not provided
        let searchKeyword = Request.params.searchKeyword || ""; // Default to empty string if searchKeyword is not provided
        let UserEmail = Request.headers['email'];
        let skipRow = (pageNo - 1) * perPage;

        let data;

        if (searchKeyword !== "0") {
            data = await DataModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                JoinStage,
                { $match: { $or: SearchArray } },
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);
        } else {
            data = await DataModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                JoinStage,
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);
        }

        // Checking if data is returned correctly and formatting the response
        let totalCount = data.length > 0 && data[0].Total.length > 0 ? data[0].Total[0].count : 0;
        let rows = data.length > 0 ? data[0].Rows : [];

        return {
            status: "success",
            data: [
                {
                    Total: totalCount,
                    Rows: rows
                }
            ]
        };
    } catch (error) {
        return {
            status: "fail",
            data: error.toString()
        };
    }
};

module.exports = ListOneJoinService;
