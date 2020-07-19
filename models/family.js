const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const familySchema=new Schema({
        ashaWorkerObjectid: {
            type: Schema.Types.ObjectId,
            ref: 'Asha_worker'
        },
        areaname: String,
        general: {
            _id:Schema.Types.ObjectId,

            toilet: Boolean,
            house: Boolean,
         
            publicBoreHandpump: String, //  " marathi "  
            category: String, // sc st others   
            belowPovertyLine: Boolean
        },
        members: [{
            _id:false,
            mobile_no:String, //10  
            memberid:Schema.Types.ObjectId,
            membername: String,
            age: Number, // age valida
            sex: String, // marathi 
            addhar_no: String,  
            bank_acc: String,
            bank_name: String,
            disability_type: [String], //marathi mei 
            disease: [String], //marathi mei
            modality: [String] //marathi 
        }],
        children: [{
            _id:false,
            childrenObjectId:Schema.Types.ObjectId,
            childrenMemberId:Schema.Types.ObjectId,
            eligibleCoupleNameObjectId:Schema.Types.ObjectId,
            coupleid: Number, 
            childname: String, // try mapping 
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
            para: Number,  //validate
            name: String,  //map
            complicationPreviousPregnancy: String,
            lastMenstrualDate: String,
            expectedDateDelivery: String,
            expectedPlaceDelivery: String,
          
            JSY: {
                paidAmount: Number,
                benefitDate: String
            },
            PMMVY: {
                registrationDate: String,
                sixmonthVisit: String,
                Penta3date: String,
            },
            delivery: {
                typeOfPregnancy: String, //marathi 
                outcomeOfPregnancy: String //mpu str
            }
        }],
        eligibleCoupleName: [{
            _id:false,
            eligibleCoupleNameId:Schema.Types.ObjectId,
            husband: String, //map
            wife: String, //map
            husbandCoupleID:Schema.Types.ObjectId,
            wifeCoupleID:Schema.Types.ObjectId,
            coupleid: Number,
            totalChildren: {
                male: Number,
                female: Number,
                ageLastChild: Number,
                genderLastChild: String //male
            },
            familyPlanningMethod: String, // marathi mei 
            ifNoOption: {
                futureMethod: String, //marathi upar
                dateOfVisit: String,
                dateOfGroupMeeting: String
            },
            fpmdates: [String] // cu t dates 
        }],
        


       
    },{collection:'family_info_temp'});


    
    module.exports=mongoose.model('family_info_temp',familySchema);