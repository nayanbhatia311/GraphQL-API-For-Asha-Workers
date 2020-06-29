const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const family_info = require('./models/family');
const AshaWorkerSchema=require('./models/Asha_worker');
const cors=require("cors");


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
            return "success";
            
          }
          catch (err) {
            console.log(err);
            throw err;
          }

        },
        updateGeneralInfo(args,parent){
           
            const filter={_id:args.id};
            const keys=Object.keys(args.input);
            let update={}
            keys.forEach(element => {
                update['general.'+element]=args.input[element]

            });

           
            try {
                family_info.findOneAndUpdate(filter,update,{new:true});
                return "success";
              }
              catch (err) {
                console.log(err);
                throw err;
              }

        },
        updateMembers(args,parents){
            const filter={'members.memberid':args.memberid};
            const keys=Object.keys(args.input);
            let update={}
            keys.forEach(element => {

                update['members.$.'+element]=args.input[element]

            });
    
            
               
                return family_info.updateOne(filter,{"$set":update},function(err,collection){
                    if(err) throw err;
                })
        },
        updateEligibleCoupleName(args,parent){
            const filter={'eligibleCoupleName.eligibleCoupleNameId':args.eligibleCoupleNameId};
            const keys=Object.keys(args.input);
            let update={}
            keys.forEach(element => {

     
                if(element==="ifNoOption"){
                    const ifNoOptionKey=Object.keys(args.input.ifNoOption);
                    
                    ifNoOptionKey.forEach(ifNoOptionElement=>{
                        update['eligibleCoupleName.$.ifNoOption.'+ifNoOptionElement]=args.input.ifNoOption[ifNoOptionElement];
                    });
                }
                else if(element==='totalChildren'){

                    const totalChildrenKey=Object.keys(args.input.totalChildren);
                    
                    totalChildrenKey.forEach(totalChildrenElement=>{
                        update['eligibleCoupleName.$.totalChildren.'+totalChildrenElement]=args.input.totalChildren[totalChildrenElement];
                    });

                }
                else{
                update['eligibleCoupleName.$.'+element]=args.input[element]
                }

            });

            
               
                return family_info.updateOne(filter,{"$set":update},function(err,collection){
                    if(err) throw err;
                });

        },
        updateChildren(args,parent){

            const filter={'children.childrenObjectId':args.childrenObjectId};
            const keys=Object.keys(args.input);
            let update={}
            keys.forEach(element => {

                if(element==="vaccination"){
                    const vaccinationKey=Object.keys(args.input.vaccination);
                    
                    vaccinationKey.forEach(vaccinationElement=>{
                        update['children.$.vaccination.'+vaccinationElement]=args.input.vaccination[vaccinationElement];
                    });
                }
                
                else{
                update['children.$.'+element]=args.input[element]
                }

            });
           
            
               
                return family_info.updateOne(filter,{"$set":update},function(err,collection){
                    if(err) throw err;
                });

        },
        updatePregnancy(args,parent){

            const filter={'pregnancy.pregnancyId':args.pregnancyId};
            const keys=Object.keys(args.input);
            let update={}
    
            keys.forEach(element => {

                if(element==="JSY"){
                    const JSYKey=Object.keys(args.input.JSY);
                    
                    JSYKey.forEach(JSYElement=>{
                        update['pregnancy.$.JSY.'+JSYElement]=args.input.JSY[JSYElement];
                    });
                }
                else if(element==="PMMVY"){
                    const PMMVYKey=Object.keys(args.input.PMMVY);
                    
                    PMMVYKey.forEach(PMMVYElement=>{
                        update['pregnancy.$.PMMVY.'+PMMVYElement]=args.input.PMMVY[PMMVYElement];
                    });
                }
                else if(element==="delivery"){
                    const deliveryKey=Object.keys(args.input.delivery);
                    
                    deliveryKey.forEach(deliveryElement=>{
                        update['pregnancy.$.delivery.'+deliveryElement]=args.input.delivery[deliveryElement];
                    });
                }
                else{
                    update['pregnancy.$.'+element]=args.input[element]
                    }

            });
          
            return family_info.updateOne(filter,{"$set":update},function(err,collection){
                if(err) throw err;
            });
               
        },

        addMembers(args,parents){
        
            let members_copy=args.input
            if(members_copy.length>0){
            for(i=0;i<members_copy.length;i++){
                console.log(i)
                members_copy[i]['memberid']=new ObjectID();
            }
        }
            
            
            family_info.updateOne({_id:args.id},{$push:{members:members_copy}},function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
            
            return "success";
        },
        addEligibleCoupleName(args,parents){

            let eligibileCoupleName_copy=args.input
            if(eligibileCoupleName_copy.length>0){
            for(i=0;i<eligibileCoupleName_copy.length;i++){
                console.log(i)
                eligibileCoupleName_copy[i]['eligibleCoupleNameId']=new ObjectID();
            }
        }
            
            
            family_info.updateOne({_id:args.id},{$push:{eligibleCoupleName:eligibileCoupleName_copy}},function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
            
            return "success";

        },
        addChildren(args,parents){

            let Children_copy=args.input
            if(Children_copy.length>0){
            for(i=0;i<Children_copy.length;i++){
                console.log(i)
                Children_copy[i]['childrenObjectId']=new ObjectID();
            }
        }
            
            
            family_info.updateOne({_id:args.id},{$push:{children:Children_copy}},function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
            
            return "success";

        },
        addPregnancy(args,parents){
            let Pregnancy_copy=args.input
            if(Pregnancy_copy.length>0){
            for(i=0;i<Pregnancy_copy.length;i++){
                console.log(i)
                Pregnancy_copy[i]['pregnancyId']=new ObjectID();
            }
        }
            
            
            family_info.updateOne({_id:args.id},{$push:{pregnancy:Pregnancy_copy}},function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
            
            return "success";

        }




    },
    graphiql: true //resolvers
}));


mongoose.connect(`mongodb://root:0LONzSmXMGrz@52.66.200.43:27017/Asha_hosp_Nayan?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
{ useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => app.listen(3000))
.catch(err => console.log("Error: ", err.message));