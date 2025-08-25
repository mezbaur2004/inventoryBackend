const ExpenseSummaryService=require("../../service/summary/ExpenseSummaryService");
const ReturnSummaryService=require("../../service/summary/ReturnSummaryService");
const PurchaseSummaryService=require("../../service/summary/PurchaseSummaryService");
const SaleSummaryService=require("../../service/summary/SaleSummaryService");

exports.ExpenseSummary=async (req,res)=>{
    let Result=await ExpenseSummaryService(req);
    res.status(200).json(Result);
}
exports.ReturnSummary=async (req,res)=>{
    let Result=await ReturnSummaryService(req);
    res.status(200).json(Result);
}
exports.PurchaseSummary=async (req,res)=>{
    let Result=await PurchaseSummaryService(req);
    res.status(200).json(Result);
}
exports.SaleSummary=async (req,res)=>{
    let Result=await SaleSummaryService(req);
    res.status(200).json(Result);
}
