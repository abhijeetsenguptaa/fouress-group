require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./configs/connection');
const userRouter = require('./routers/user.routes');
const categoryRouter = require('./routers/category.routes');
const bannerRouter = require('./routers/banner.routes');
const adminRoute = require('./routers/admin.routes');
const subCategoryRouter = require('./routers/sub_category.routes');
const productRoute = require('./routers/product.routes');
const countryRoute = require('./routers/country.routes');
const stateRoute = require('./routers/state.routes');
const cityRoute = require('./routers/city.routes');
const CategoryModel = require('./models/category.model');
const Sub_Category_Model = require('./models/sub_category.model');
const enquireRoute = require('./routers/enquiry.routes');
const notificationRouter = require('./routers/notification.routes');



const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        
        // Fetch subcategories for each category
        const categoriesWithSubcategories = await Promise.all(categories.map(async (category) => {
            const subcategories = await Sub_Category_Model.find({ category_id: category._id });  // Replace 'SubCategoryModel' with the actual model for subcategories
            return {
                _id: category._id,
                name: category.title,
                count: subcategories.length,
                subcategories: subcategories
            };
        }));

        return res.status(200).json({
            status: true,
            message: 'Welcome to Fouress-Group.',
            count: categoriesWithSubcategories.length,
            data: categoriesWithSubcategories
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

app.use('/uploads', express.static('uploads')) // checking the static images.
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/banners', bannerRouter);
app.use('/admin', adminRoute);
app.use('/sub-categories', subCategoryRouter);
app.use('/products', productRoute);
app.use('/country', countryRoute);
app.use('/state', stateRoute);
app.use('/city', cityRoute);
app.use('/enquiry', enquireRoute);
app.use('/notifications', notificationRouter);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Database is successfully connected.');
    } catch (error) {
        console.log(error);
    }
    console.log('Server is running on the port ' + PORT);
})