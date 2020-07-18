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
            _id:false,
            mobile_no:String,
            memberid:Schema.Types.ObjectId,
            membername: String,
            age: Number,
            sex: String,
            addhar_no: String,
            bank_acc: String,
            bank_name: String,
            disability_type: [String],
            disease: [String],
            modality: [String]
        }],
        children: [{
            _id:false,
            childrenObjectId:Schema.Types.ObjectId,
            childrenMemberId:Schema.Types.ObjectId,
            eligibleCoupleNameObjectId:Schema.Types.ObjectId,
            coupleid: Number,
            childname: String,
            childRCH: String,
            vaccination: {
                OPV: [String],
                B2VIT: [String],
                BCG: [String],
                OPV1_IPV1_Penta1_Rota1: [String],
                OPV_2_Penta_2_Rota_2: [String],
                OPV_3_IPV2_Penta3_Rota3: [String],
                MR1_VitA1: [String],
                DPTB_OPVB_MR2_VitA2: [String]
            }
        }],
        pregnancy: [{
            _id:false,
            momObjectID:Schema.Types.ObjectId,
            pregnancyId:Schema.Types.ObjectId,
            para: Number,
            name: String,
            complicationPreviousPregnancy: String,
            lastMenstrualString: String,
            expectedStringDelivery: String,
            expectedPlaceDelivery: String,
            registrationString: String,
            JSY: {
                paidAmount: Number,
                benefitString: String
            },
            PMMVY: {
                registrationString: String,
                sixmonthVisit: String,
                Penta3String: String,
            },
            delivery: {
                typeOfPregnancy: String,
                outcomeOfPregnancy: String
            }
        }],
        eligibleCoupleName: [{
            _id:false,
            eligibleCoupleNameId:Schema.Types.ObjectId,
            husband: String,
            wife: String,
            husbandCoupleID:Schema.Types.ObjectId,
            wifeCoupleID:Schema.Types.ObjectId,
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
                StringOfVisit: String,
                StringOfGroupMeeting: String
            },
            fpmStrings: [String]
        }],
        


       
    },{collection:'family_info_temp'});


    
    module.exports=mongoose.model('family_info_temp',familySchema);