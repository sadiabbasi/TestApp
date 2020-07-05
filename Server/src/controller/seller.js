const constant = require("../constant"),
generalService = require("../services/generalOperation"),
TableName = "User";
/* ************************************************************************************** */
// Function for seller listing on buyer side
/* ************************************************************************************** */

const sellerListing = async (req, res) => {
    try {
        let sellerLists = await generalService.getRecord(TableName,{role:'seller'} );
        res.send({
            status: constant.SUCCESS,
            data: sellerLists
        })    
    } catch (error) {
        res.send({
            status: constant.ERROR,
            message: "Connectivity error try again"
        });
    }
};

const bookAppointment = async (req, res) => {
    try {
        const {name, phone, age, seller, slot, date} = req.body
        let appointment = await generalService.addRecord("Appointments", {name, phone, age, seller, slot, buyer:req.user._id, date:date})
        res.send({
            status: constant.SUCCESS,
            data: appointment
        })    
    } catch (error) {
        res.send({
            status: constant.ERROR,
            message: "Connectivity error try again"
        });
    }
};

const appointments = async (req, res) => {
    try {
        let appointmentList = await generalService.getRecord("Appointments", {seller: req.user._id})
        res.send({
            status: constant.SUCCESS,
            appointments: appointmentList
        })    
    } catch (error) {
        res.send({
            status: constant.ERROR,
            message: "Connectivity error try again"
        });
    }
};

const updateAppointmentStatus = async(req,res) => {
    try {
        const {appointment, status} = req.body
        await generalService.updateRecordOnCondition("Appointments", {_id: appointment, seller: req.user._id}, {status: status})
        let appointmentList = await generalService.getRecord("Appointments", {seller: req.user._id})
        res.send({
            status: constant.SUCCESS,
            appointments: appointmentList,
            message: "Status updated successfully"
        })    
    } catch (error) {
        res.send({
            status: constant.ERROR,
            message: "Connectivity error try again"
        });
    }
}

const selectedSlots = async (req, res) => {
    try {
        let appointmentList = await generalService.getRecord("Appointments", {seller: req.body.seller})
        res.send({
            status: constant.SUCCESS,
            data: appointmentList
        })    
    } catch (error) {
        res.send({
            status: constant.ERROR,
            message: "Connectivity error try again"
        });
    }
};

module.exports = {
    sellerListing,
    bookAppointment,
    appointments,
    updateAppointmentStatus,
    selectedSlots
};