const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const familySchema=new Schema({

        ashaWorkerObjectid: {
            type: Schema.Types.ObjectId,
            ref: 'Asha_worker'
        },
        mobileNo: Number,
        areaname: String,
        general: {
            _id:Schema.Types.ObjectId,
            totalMembers: Number,
            toilet: Boolean,
            house: Boolean,
            waterSupply: Boolean,
            publicBoreHandpump: String,
            category: String,
            belowPovertyLine: Boolean
        },
        members: [{
            _id:Schema.Types.ObjectId,
            membername: String,
            age: Number,
            sex: String,
            addhar_no: Number,
            bank_acc: String,
            bank_name: String,
            disability_type: [String],
            disease: [String],
            modality: [String]
        }],
        children: [{
            _id:Schema.Types.ObjectId,
            coupleid: Number,
            childname: String,
            childRCH: String,
            vaccination: {
                OPV: [Date],
                B2VIT: [Date],
                BCG: [Date],
                OPV1IPV1Penta1Rota1: [Date],
                OPV2Penta2Rota2: [Date],
                OPV3IPV2Penta3Rota3: [Date],
                MR1VitA1: [Date],
                DPTBOPVBMR2VitA2: [Date]
            }
        }],
        pregnancy: [{
            _id:Schema.Types.ObjectId,
            para: Number,
            name: String,
            complicationPreviousPregnancy: String,
            lastMenstrualDate: Date,
            expectedDateDelivery: Date,
            expectedPlaceDelivery: String,
            registrationDate: Date,
            JSY: {
                paidAmount: Number,
                benefitDate: Date
            },
            PMMVY: {
                registrationDate: Date,
                sixmonthVisit: Date,
                Penta3date: Date,
            },
            delivery: {
                typeOfPregnancy: String,
                outcomeOfPregnancy: String
            }
        }],
        eligibleCoupleName: [{
            _id:Schema.Types.ObjectId,
            husband: String,
            wife: String,
            coupleid: Number,
            totalChildren: {
                male: Number,
                female: Number,
                ageLastChild: Number,
                genderLastChild: String
            },
            familyPlanningMethod: String,
            ifNoOption: {
                futureMethod: String,
                dateOfVisit: Date,
                dateOfGroupMeeting: Date
            },
            fpmdates: [Date]
        }],
        


       
    },{collection:'family_info'});


    
    module.exports=mongoose.model('family_info',familySchema);