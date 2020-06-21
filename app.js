const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const family_info = require('./models/family');
const AshaWorkerSchema=require('./models/Asha_worker');
const cors=require("cors")
// const temp_family=require('./temp_family');
const app = express();
app.use(cors());
app.use(bodyParser.json());

//when events, createEvents is called, function of rootValue is called
app.use('/graphql', graphqlHttp({
    schema: schema,
    rootValue: {
        getFamilies: ({ashaWorkerObjectid}) => {
            return family_info.find({ashaWorkerObjectid:ashaWorkerObjectid}).populate('ashaWorkerObjectid');
        },
        getAshaWorker:({_id})=>{
          
          return AshaWorkerSchema.findById(_id);

        },
        getFamily:({_id})=>{
      
          return family_info.findById(_id).populate('ashaWorkerObjectid');

        },
        searchName:({name})=>{
            let search=`\"${name}\""`
            console.log(search);
            return family_info.find({ $text: { $search: search } }).populate('ashaWorkerObjectid');
        },
        createFamily: async (args, parent) => {
      


            let members = [];
            let eligibleCoupleNames = [];
            let children = [];
            let pregnancies = [];
            for (let i = 0; i < Object.keys(args.input.members).length; i++) {
                let member = {
                    membername: args.input.members[i].membername,
                    sex: args.input.members[i].sex,
                    age: args.input.members[i].age,
                    addhar_no: args.input.members[i].addhar_no,
                    bank_acc: args.input.members[i].bank_acc,
                    bank_name: args.input.members[i].bank_name,
                    disability_input: args.input.members[i].disability_input,
                    disease: args.input.members[i].disease,
                    modality: args.input.members[i].modality

                };
                members.push(member);
            }

            for (let i = 0; i < Object.keys(args.input.eligibleCoupleName).length; i++) {
                let eligibleCoupleName = {
                    husband: args.input.eligibleCoupleName[i].husband,
                    wife: args.input.eligibleCoupleName[i].wife,
                    coupleid: args.input.eligibleCoupleName[i].coupleid,
                    familyPlanningMethod: args.input.eligibleCoupleName[i].familyPlanningMethod,
                    ifNoOption: {
                        futureMethod: args.input.eligibleCoupleName[i].ifNoOption.futureMethod,
                        dateOfVisit: args.input.eligibleCoupleName[i].ifNoOption.dateOfVisit,
                        dateOfGroupMeeting: args.input.eligibleCoupleName[i].ifNoOption.dateOfGroupMeeting
                    }

                };
                eligibleCoupleNames.push(eligibleCoupleName);
            }

            for (let i = 0; i < Object.keys(args.input.pregnancy).length; i++) {
                let pregnancy = {
                    para: args.input.pregnancy[i].para,
                    name: args.input.pregnancy[i].name,
                    complicationPreviousPregnancy: args.input.pregnancy[i].complicationPreviousPregnancy,
                    lastMenstrualDate: args.input.pregnancy[i].lastMenstrualDate,
                    expectedDateDelivery: args.input.pregnancy[i].expectedDateDelivery,
                    expectedPlaceDelivery: args.input.pregnancy[i].expectedPlaceDelivery,
                    registrationDate: args.input.pregnancy[i].registrationDate,
                    delivery: args.input.pregnancy[i].delivery,
                    PMMVY: args.input.pregnancy[i].PMMVY,
                    JSY: args.input.pregnancy[i].JSY
                };
                pregnancies.push(pregnancy);
            };

            for (let i = 0; i < Object.keys(args.input.children).length; i++) {
                let child = {
                    childname: args.input.children[i].childname,
                    childRCH: args.input.children[i].childRCH,
                    vaccination: {
                        OPV: args.input.children[i].OPV,
                        B2VIT: args.input.children[i].B2VIT,
                        BCG: args.input.children[i].BCG,
                        OPV1IPV1Penta1Rota1: args.input.children[i].vaccination.OPV1IPV1Penta1Rota1,
                        OPV2Penta2Rota2: args.input.children[i].vaccination.OPV2Penta2Rota2,
                        OPV3IPV2Penta3Rota3: args.input.children[i].vaccination.OPV3IPV2Penta3Rota3,
                        MR1VitA1: args.input.children[i].vaccination.MR1VitA1,
                        DPTBOPVBMR2VitA2: args.input.children[i].vaccination.DPTBOPVBMR2VitA2
                    }
                };
                children.push(child);
            }

            let family_schema = new family_info({
                mobileNo: args.input.mobileNo,
                ashaWorkerObjectid: args.input.ashaWorkerObjectid,
                areaname: args.input.areaname,
                eligibleCoupleName: eligibleCoupleNames,
                pregnancy: pregnancies,
                children: children,
                members: members,
                general: {
                    totalMembers: args.input.general.totalMembers,
                    toilet: args.input.general.toilet,
                    house: args.input.general.house,
                    waterSupply: args.input.general.waterSupply,
                    publicBoreHandpump: args.input.general.publicBoreHandpump,
                    category: args.input.general.category,
                    belowPovertyLine: args.input.general.belowPovertyLine

                },


            });

            try {
            return await family_schema.save();
            
          }
          catch (err) {
            console.log(err);
            throw err;
          }

        },
        updateFamily(args,parent){
            console.log(args.input);

        }




    },
    graphiql: true //resolvers
}));


// mongoose.connect(`mongodb://root:0LONzSmXMGrz@52.66.200.43:27017/Asha_hosp_Nayan?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// });
// const db = mongoose.connection;
// db.once('open', function() {
    


// });

mongoose.connect(`mongodb://root:0LONzSmXMGrz@52.66.200.43:27017/Asha_hosp_Nayan?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
{ useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => app.listen(3000))
.catch(err => console.log("Error: ", err.message));