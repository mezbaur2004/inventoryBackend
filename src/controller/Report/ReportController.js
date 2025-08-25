const ExpenseReportService=require("../../service/report/ExpenseReportService");
const PurchaseReportService=require("../../service/report/PurchaseReportService");
const ReturnReportService=require("../../service/report/ReturnReportService");
const SaleReportService=require("../../service/report/SaleReportService");


exports.ExpenseByDate=async (req,res)=>{
    let Result=await ExpenseReportService(req);
    res.status(200).json(Result);
}

exports.PurchaseByDate=async (req,res)=>{
    let Result=await PurchaseReportService(req);
    res.status(200).json(Result);
}

exports.ReturnByDate=async (req,res)=>{
    let Result=await ReturnReportService(req);
    res.status(200).json(Result);
}

exports.SaleByDate=async (req,res)=>{
    let Result=await SaleReportService(req);
    res.status(200).json(Result);
}