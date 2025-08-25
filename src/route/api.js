const express=require('express');
const AuthMiddleware=require('../middleware/AuthMiddlewere');
const UserController=require('../controller/Users/UsersController');
const BrandsController = require("../controller/Brands/BrandsController");
const CategoryController =require("../controller/Categories/CategoriesController");
const CustomerController=require("../controller/Customers/CustomersController");
const SupplierController=require("../controller/Suppliers/SuppliersController");
const ExpenseTypeController=require("../controller/Expenses/ExpenseTypeController");
const ExpenseController=require("../controller/Expenses/ExpensesController");
const ProductController=require("../controller/Products/ProductsController");
const PurchaseController=require("../controller/Purchases/PurchasesController");
const SalesController=require("../controller/Sales/SalesController");
const ReturnsController=require("../controller/Returns/ReturnsController");
const ReportController=require("../controller/Report/ReportController");
const SummaryController=require("../controller/Summary/SummaryController");

const router=express.Router();


//Users
router.post("/registration",UserController.Registration);
router.post("/login",UserController.Login);
router.post("/profileUpdate",AuthMiddleware,UserController.ProfileUpdate);
router.get("/profileDetails",AuthMiddleware,UserController.ProfileDetails);
router.get("/recoverVerifyEmail/:email",UserController.RecoverVerifyEmail);
router.get("/recoverVerifyOTP/:email/:otp",UserController.RecoverVerifyOTP);
router.post("/recoverResetPass",UserController.RecoverResetPass);

//Brands
router.post("/createBrand",AuthMiddleware,BrandsController.CreateBrand);
router.post("/updateBrand/:id",AuthMiddleware,BrandsController.UpdateBrand);
router.get("/brandList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,BrandsController.BrandList);
router.get("/brandDropDown",AuthMiddleware,BrandsController.BrandDropDown);
router.get("/deleteBrand/:id",AuthMiddleware,BrandsController.DeleteBrand);
router.get("/brandDetailsByID/:id",AuthMiddleware,BrandsController.BrandDetailsByID);

//Categories
router.post("/createCategory",AuthMiddleware,CategoryController.CreateCategories);
router.post("/updateCategory/:id",AuthMiddleware,CategoryController.UpdateCategories);
router.get("/categoryList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,CategoryController.CategoryList);
router.get("/categoryDropDown",AuthMiddleware,CategoryController.CategoryDropDown);
router.get("/deleteCategory/:id",AuthMiddleware,CategoryController.DeleteCategory);
router.get("/categoryDetailsByID/:id",AuthMiddleware,CategoryController.CategoryDetailsByID);

//Customers
router.post("/createCustomer",AuthMiddleware,CustomerController.CreateCustomers);
router.post("/updateCustomer/:id",AuthMiddleware,CustomerController.UpdateCustomers);
router.get("/customerList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,CustomerController.CustomerList);
router.get("/customerDropDown",AuthMiddleware,CustomerController.CustomerDropDown);
router.get("/deleteCustomer/:id",AuthMiddleware,CustomerController.DeleteCustomer);
router.get("/customerDetailsByID/:id",AuthMiddleware,CustomerController.CustomerDetailsByID);

//Suppliers
router.post("/createSupplier",AuthMiddleware,SupplierController.CreateSuppliers);
router.post("/updateSupplier/:id",AuthMiddleware,SupplierController.UpdateSuppliers);
router.get("/supplierList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,SupplierController.SupplierList);
router.get("/supplierDropDown",AuthMiddleware,SupplierController.SupplierDropDown);
router.get("/deleteSupplier/:id",AuthMiddleware,SupplierController.DeleteSupplier);
router.get("/supplierDetailsByID/:id",AuthMiddleware,SupplierController.SupplierDetailsByID);

//ExpenseType
router.post("/createExpenseType",AuthMiddleware,ExpenseTypeController.CreateExpenseType);
router.post("/updateExpenseType/:id",AuthMiddleware,ExpenseTypeController.UpdateExpenseType);
router.get("/expenseTypeList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,ExpenseTypeController.ExpenseTypeList);
router.get("/expenseTypeDropDown",AuthMiddleware,ExpenseTypeController.ExpenseTypeDropDown);
router.get("/expenseTypeDetailsByID/:id",AuthMiddleware,ExpenseTypeController.ExpenseTypeDetailsByID);
router.get("/deleteExpenseTypes/:id",AuthMiddleware,ExpenseTypeController.DeleteExpenseType);

//Expenses
router.post("/createExpense",AuthMiddleware,ExpenseController.CreateExpenses);
router.post("/updateExpense/:id",AuthMiddleware,ExpenseController.UpdateExpenses);
router.get("/expenseList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,ExpenseController.ExpenseList);
router.get("/deleteExpense/:id",AuthMiddleware,ExpenseController.DeleteExpense);
router.get("/expenseDetailsByID/:id",AuthMiddleware,ExpenseController.ExpenseDetailsByID);

//Products
router.post("/createProduct",AuthMiddleware,ProductController.CreateProducts);
router.post("/updateProduct/:id",AuthMiddleware,ProductController.UpdateProducts);
router.get("/productList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,ProductController.ProductList);
router.get("/deleteProduct/:id",AuthMiddleware,ProductController.DeleteProduct);
router.get("/productDetailsByID/:id",AuthMiddleware,ProductController.ProductDetailsByID);
router.get("/productDropDown",AuthMiddleware,ProductController.ProductDropDown);

//Purchases
router.post("/createPurchase",AuthMiddleware,PurchaseController.CreatePurchases);
router.get("/purchaseList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,PurchaseController.PurchaseList);
router.get("/deletePurchase/:id",AuthMiddleware,PurchaseController.DeletePurchase);

//Sales
router.post("/createSale",AuthMiddleware,SalesController.CreateSales);
router.get("/saleList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,SalesController.SaleList);
router.get("/deleteSale/:id",AuthMiddleware,SalesController.DeleteSale);

//Returns
router.post("/createReturn",AuthMiddleware,ReturnsController.CreateReturns);
router.get("/returnList/:pageNo/:perPage/:searchKeyword",AuthMiddleware,ReturnsController.ReturnList);
router.get("/deleteReturn/:id",AuthMiddleware,ReturnsController.DeleteReturn);

//Reports
router.post("/expenseByDate",AuthMiddleware,ReportController.ExpenseByDate);
router.post("/purchaseByDate",AuthMiddleware,ReportController.PurchaseByDate);
router.post("/returnByDate",AuthMiddleware,ReportController.ReturnByDate);
router.post("/saleByDate",AuthMiddleware,ReportController.SaleByDate);

//Summary
router.get("/expenseSummary",AuthMiddleware,SummaryController.ExpenseSummary);
router.get("/returnSummary",AuthMiddleware,SummaryController.ReturnSummary);
router.get("/purchaseSummary",AuthMiddleware,SummaryController.PurchaseSummary);
router.get("/saleSummary",AuthMiddleware,SummaryController.SaleSummary);

module.exports=router;