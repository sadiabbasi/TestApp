const constant = require("../constant"),
generalService = require("../services/generalOperation"),
TableName = "User";

const setAvailability = async (req, res) => {
    try {
        const {day, data} = req.body;
        let availability = "availability."+day
        let seller = await generalService.updateRecord(TableName, req.user._id, {[availability]: data});
        res.send({
            status: constant.SUCCESS,
            availability: seller.availability,
            message : "Set time successfully"
        })   
    } catch (error) {
        res.send({
            status: constant.ERROR,
            message: "Connectivity error try again"
        });
    }
};

const getAvailability = async (req, res) => {
    try {
        let seller = await generalService.getSingleRecord(TableName, {_id: req.user._id})
        res.send({
            status: constant.SUCCESS,
            availability: seller.availability
        })    
    } catch (error) {
        res.send({
            status: constant.ERROR,
            message: "Connectivity error try again"
        });
    }
};

const updateAvailabilityStatus = async (req, res) => {
    try {
        const { day, status} = req.body;
        let availability = "availability."+day+".status";
        let seller = await generalService.updateRecord(TableName, req.user._id, {[availability]: status});
        res.send({
            status: constant.SUCCESS,
            availability: seller.availability,
            message: status? "Day enabled successfully": "Day disabled successfully"
        })    
    } catch (error) {
        res.send({
        status: constant.ERROR,
        message: "Connectivity error try again"
        });
    }
};

module.exports = {
    setAvailability,
    getAvailability,
    updateAvailabilityStatus
};