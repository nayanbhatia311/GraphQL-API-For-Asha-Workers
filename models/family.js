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
         
            publicBoreHandpump: {
                type:String,
                enum:["सार्वजनिक","विहीर","हातपंप","बोअर"]
            }, //  " marathi "  
            category: {
                type:String
                // enum:["प्रवर्ग अनुसूचित जाती","अनु.जमाती","इतर"]
            }, // sc st others   
            belowPovertyLine: Boolean
        },
        members: [{
            _id:false,
            mobile_no:String, //10  
            memberid:Schema.Types.ObjectId,
            membername: String,
            age: Number, // age valida
            sex: {
                type:String,
                enum:["पुरुष","स्त्री","इतर"]
            }, // marathi 
            addhar_no: String,  
            bank_acc: String,
            bank_name: String,
            disability_type: {
                type:[String]
                // enum:["डोळा","कान","ऑर्थो","इतर"] //bp heart disease  tb hypertension cancer 
            }, //marathi mei 
            disease: {
                type:[String]
                // enum:["उच्च रक्तदाब","हृदय रोग","टीबी","हायपर टेन्शन","कर्करोग","मधुमेह","इतर"] //bp heart disease  tb hypertension cancer diabetics
            }, //marathi mei
            modality: {
                type:[String]
                // enum:["होमिओपॅथी","आयुर्वेदिक","अ‍ॅलोपॅथी","इतर"]
            } //marathi 
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
                typeOfPregnancy: {
                    
                    type:String,
                    enum:["सामान्य प्रसूती","सिझरियन प्रसूती"] 
                }, //marathi 
                outcomeOfPregnancy:  {
                    type:String,
                    enum:["पुरुष","स्त्री","इतर"]
                     }  //mpu str
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
                genderLastChild: {
                    type:String,
                    enum:["पुरुष","स्त्री","इतर"]
                     }     //male
            },
            familyPlanningMethod: {
                type:String,
                enum:["गर्भनिरोधक गोळ्या","कॉपर टी","अंतरा","निरोध","नसबंदी","काहीही नाही"] //oral pills cu T antara condom   sterlisation no option
            }, // marathi mei 
            ifNoOption: {
                futureMethod: {
                    type:String,
                    enum:["गर्भनिरोधक गोळ्या","कॉपर टी","अंतरा","निरोध","नसबंदी","काहीही नाही"]//oral pills cu T antara condom   sterlisation no option
                }, //marathi upar
                dateOfVisit: String,
                dateOfGroupMeeting: String
            },
            fpmdates: [String] // cu t dates 
        }],
        


       
    },{collection:'family_info_temp'});


    
    module.exports=mongoose.model('family_info_temp',familySchema);