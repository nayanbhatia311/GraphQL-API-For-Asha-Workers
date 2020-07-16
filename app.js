const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const family_info = require('./models/family');
const AshaWorkerSchema=require('./models/Asha_worker');
const cors=require("cors");

function setDefaultVal(value){
    console.log(value,typeof(value));
    return (value === undefined) ? undefined : typeof(value)==="string"?value:value.map(Date.parse);
 }  

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
                    mobile_no:args.input.members[i].mobile_no,
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
                    husbandCoupleID:args.input.eligibleCoupleName[i].husbandCoupleID,
                    wifeCoupleID:args.input.eligibleCoupleName[i].wifeCoupleID,
                    coupleid: args.input.eligibleCoupleName[i].coupleid,
                    familyPlanningMethod: args.input.eligibleCoupleName[i].familyPlanningMethod,
                    ifNoOption: {
                        futureMethod: args.input.eligibleCoupleName[i].ifNoOption.futureMethod,
                        dateOfVisit: setDefaultVal(args.input.eligibleCoupleName[i].ifNoOption.dateOfVisit),
                        dateOfGroupMeeting: setDefaultVal(args.input.eligibleCoupleName[i].ifNoOption.dateOfGroupMeeting)
                    },
                    fpmdates:args.input.eligibleCoupleName[i].fpmdates

                };
                eligibleCoupleNames.push(eligibleCoupleName);
            }

            for (let i = 0; i < Object.keys(args.input.pregnancy).length; i++) {
                let pregnancy = {
                    para: args.input.pregnancy[i].para,
                    name: args.input.pregnancy[i].name,
                    momObjectID:args.input.pregnancy[i].momObjectID,
                    complicationPreviousPregnancy: args.input.pregnancy[i].complicationPreviousPregnancy,
                    lastMenstrualDate: setDefaultVal(args.input.pregnancy[i].lastMenstrualDate),
                    expectedDateDelivery: setDefaultVal(args.input.pregnancy[i].expectedDateDelivery),
                    expectedPlaceDelivery: args.input.pregnancy[i].expectedPlaceDelivery,
                    registrationDate: setDefaultVal(args.input.pregnancy[i].registrationDate),
                    delivery: args.input.pregnancy[i].delivery,
                    PMMVY: {
                        registrationDate: setDefaultVal(args.input.pregnancy[i].PMMVY.registrationDate),
                        sixmonthVisit: setDefaultVal(args.input.pregnancy[i].PMMVY.sixmonthVisit),
                        Penta3date: setDefaultVal(args.input.pregnancy[i].PMMVY.Penta3date)
                        
                    },
                    JSY:{ 
                        paidAmount: args.input.pregnancy[i].JSY.paidAmount,
                        benefitDate: setDefaultVal(args.input.pregnancy[i].JSY.benefitDate)
                        
                    }
                };
                pregnancies.push(pregnancy);
            };

            for (let i = 0; i < Object.keys(args.input.children).length; i++) {
                
                let child = {
                    childname: args.input.children[i].childname,
                    childRCH: args.input.children[i].childRCH,
                    vaccination: {
                        OPV: setDefaultVal(args.input.children[i].vaccination.OPV),
                        B2VIT: setDefaultVal(args.input.children[i].vaccination.B2VIT),
                        BCG:setDefaultVal( args.input.children[i].vaccination.BCG),
                        OPV1IPV1Penta1Rota1: setDefaultVal(args.input.children[i].vaccination.OPV1IPV1Penta1Rota1),
                        OPV2Penta2Rota2: setDefaultVal(args.input.children[i].vaccination.OPV2Penta2Rota2),
                        OPV3IPV2Penta3Rota3:setDefaultVal( args.input.children[i].vaccination.OPV3IPV2Penta3Rota3),
                        MR1VitA1: setDefaultVal(args.input.children[i].vaccination.MR1VitA1),
                        DPTBOPVBMR2VitA2: setDefaultVal(args.input.children[i].vaccination.DPTBOPVBMR2VitA2)
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
               return family_schema.save();
            // return "success";
            
          }
          catch (err) {
            console.log(err);
            throw err;
          }

        },
        updateGeneralInfo(args,parent){
           if(mongoose.Types.ObjectId.isValid(args.id)){
            const filter={_id:args.id};
            const keys=Object.keys(args.input);
            let update={}
            keys.forEach(element => {
                update['general.'+element]=args.input[element]

            });
            

           
            return family_info.updateOne(filter,{"$set":update},function(err,collection){
                if(err) throw err;
            })
        }
        else{
            return {
                n:-1,
                ok:-1,
                nModified:-1

            };
        }

        },
        updateMembers(args,parents){
            if(mongoose.Types.ObjectId.isValid(args.memberid)){
            const filter={'members.memberid':args.memberid};
            const keys=Object.keys(args.input);
            let update={}
            keys.forEach(element => {

                update['members.$.'+element]=args.input[element]

            });
    
            
               
                return family_info.updateOne(filter,{"$set":update},function(err,collection){
                    if(err) throw err;
                });
            }
            else{
                return {
                    n:-1,
                    ok:-1,
                    nModified:-1
    
                };

            }
        },
        updateEligibleCoupleName(args,parent){
            if(mongoose.Types.ObjectId.isValid(args.eligibleCoupleNameId)){
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
            }
            else{
                return {
                    n:-1,
                    ok:-1,
                    nModified:-1
    
                };

            }

        },
        updateChildren(args,parent){
            
            if(mongoose.Types.ObjectId.isValid(args.childrenObjectId)){
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
            }
            else{

                return {
                    n:-1,
                    ok:-1,
                    nModified:-1
    
                };
            }

        },
        updatePregnancy(args,parent){
            if(mongoose.Types.ObjectId.isValid(args.pregnancyId)){
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
        }
        else{
            return {
                n:-1,
                ok:-1,
                nModified:-1

            };
        }
               
        },

        async addMembers(args,parents){
            if(mongoose.Types.ObjectId.isValid(args.id)){
            let members_copy=args.input;
            // if(members_copy.length>0){
            // for(i=0;i<members_copy.length;i++){
                
            //     members_copy[i]['memberid']=new ObjectID();
            // }
        // }
            
          return family_info.updateOne({_id:args.id},{$push:{members:members_copy}});
            
           
        }
            else{
                return {
                    n:-1,
                    ok:-1,
                    nModified:-1
    
                };
            }
            },
        async addEligibleCoupleName(args,parents){
            if(mongoose.Types.ObjectId.isValid(args.id)){
            let eligibileCoupleName_copy=args.input;
            // if(eligibileCoupleName_copy.length>0){
            // for(i=0;i<eligibileCoupleName_copy.length;i++){
                
            //     eligibileCoupleName_copy[i]['eligibleCoupleNameId']=new ObjectID();
            // }
        // }
            
            
         return family_info.updateOne({_id:args.id},{$push:{eligibleCoupleName:eligibileCoupleName_copy}});
            
            
        }
        else{
            return {
                n:-1,
                ok:-1,
                nModified:-1

            };
            
        }

        },
        async addChildren(args,parents){
            if(mongoose.Types.ObjectId.isValid(args.id)){
            let Children_copy=args.input;
            // if(Children_copy.length>0){
            // for(i=0;i<Children_copy.length;i++){
            
            //     Children_copy[i]['childrenObjectId']=new ObjectID();
            // }
        // }
            
            
           return family_info.updateOne({_id:args.id},{$push:{children:Children_copy}});
            
        
        }
        else{
            return {
                n:-1,
                ok:-1,
                nModified:-1

            };
            
        }

        },
        async addPregnancy(args,parents){
            if(mongoose.Types.ObjectId.isValid(args.id)){
            let Pregnancy_copy=args.input;
            // if(Pregnancy_copy.length>0){
            // for(i=0;i<Pregnancy_copy.length;i++){
        
            //     Pregnancy_copy[i]['pregnancyId']=new ObjectID();
            // }
        // }
            
            
           return family_info.updateOne({_id:args.id},{$push:{pregnancy:Pregnancy_copy}});
            
            
        }
        else{
            return {
                n:-1,
                ok:-1,
                nModified:-1

            };
            
        }

        }




    },
    graphiql: true //resolvers
}));


mongoose.connect(`mongodb://root:0LONzSmXMGrz@52.66.200.43:27017/Asha_hosp_Nayan?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
{ useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => app.listen(3000))
.catch(err => console.log("Error: ", err.message));