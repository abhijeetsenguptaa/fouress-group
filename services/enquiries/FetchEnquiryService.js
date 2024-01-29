async function FetchEnquiryService(id, status) {
    try {
        const { id, status } = req.body;


    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}


module.exports = FetchEnquiryService;