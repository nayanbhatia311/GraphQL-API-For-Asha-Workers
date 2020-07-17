const {buildSchema}=require('graphql');

module.exports=buildSchema(`
  type IfNoOption
  {
    futureMethod: String
    dateOfVisit: Float
    dateOfGroupMeeting: Float
  }
  type TotalChildren
  {
    male: Int
    female: Int
    ageLastChild: Int
    genderLastChild: String
  }

  type EligibleCoupleName
  {
    eligibleCoupleNameId:ID
    husbandCoupleID:ID
    wifeCoupleID:ID
    husband: String
    wife: String
    coupleid: Int
    familyPlanningMethod: String
    fpmdates:[String]
    ifNoOption: IfNoOption
    totalChildren: TotalChildren
  }
  type Delivery
  {

    typeOfPregnancy: String outcomeOfPregnancy: String

  }
  type Pmmvy
  {
    registrationDate: Float
    sixmonthVisit: Float
    Penta3date: Float
  }
  type Jsy
  {
    paidAmount: Float benefitDate: Float
  }

  type Pregnancy
  {
    pregnancyId:ID
    para: Int
    name: String
    complicationPreviousPregnancy: String
    lastMenstrualDate: Float
    expectedDateDelivery: Float
    momObjectID:ID
    expectedPlaceDelivery: String
    registrationDate: Float
    delivery: Delivery
    PMMVY: Pmmvy
    JSY: Jsy
  }

  type Vaccination
  {
    DPTB_OPVB_MR2_VitA2: [Float]
    MR1_VitA1: [Float]
    OPV_3_IPV2_Penta3_Rota3: [Float]
    OPV_2_Penta_2_Rota_2: [Float]
    OPV1_IPV1_Penta1_Rota1: [Float]
    BCG: [Float]
    B2VIT: [Float]
    OPV: [Float]
  }
  type Children
  {
    childrenObjectId:ID
    eligibleCoupleNameObjectId:ID
    coupleid: Int
    childname: String
    childRCH: String
    vaccination: Vaccination
  }

  type Members
  {
    memberid:ID
    membername: String
    age: Int
    sex: String
    mobile_no:String
    addhar_no: Float
    bank_acc: String
    bank_name: String
    disability_type: [String]
    disease: [String]
    modality: [String]
  }
  type General
  {
    totalMembers: Int
    toilet: Boolean
    house: Boolean
    waterSupply: Boolean
    publicBoreHandpump: String
    category: String
    belowPovertyLine: Boolean
  }
  type AutogeneratedMainType
  {
    _id: ID
    ashaWorkerObjectid: AshaWorker    

    areaname: String
    eligibleCoupleName: [EligibleCoupleName]
    pregnancy: [Pregnancy]
    children: [Children]
    members: [Members]
    general: General
  }
  type AshaWorker
  {
      _id:ID
      name:String
      subcenter:String
      Village:String
      
  }

  type modifiedMongo
  { n: Int
    nModified: Int 
    ok: Int 
  
  }
  
  input IfNoOptionInput
  {
    futureMethod: String
    dateOfVisit: String
    dateOfGroupMeeting: String
  }
  input TotalChildrenInput
  {
    male: Int
    female: Int
    ageLastChild: Int
    genderLastChild: String
  }

  input EligibleCoupleNameInput
  {
    eligibleCoupleNameId:ID
    husbandCoupleID:ID
    wifeCoupleID:ID
    husband: String
    wife: String
    coupleid: Int
    familyPlanningMethod: String
    ifNoOption: IfNoOptionInput
    totalChildren: TotalChildrenInput
  }
  input DeliveryInput
  {
    typeOfPregnancy: String 
    outcomeOfPregnancy: String
  }
  input PmmvyInput
  {
    registrationDate: String
    sixmonthVisit: String
    Penta3date: String
  }
  input JsyInput
  {
    paidAmount: Float benefitDate: String
  }

  input PregnancyInput
  {
    pregnancyId:ID
    momObjectID:ID
    para: Int
    name: String
    complicationPreviousPregnancy: String
    lastMenstrualDate: String
    expectedDateDelivery: String
    expectedPlaceDelivery: String
    registrationDate: String
    delivery: DeliveryInput
    PMMVY: PmmvyInput
    JSY: JsyInput
  }

  input VaccinationInput
  {
    DPTB_OPVB_MR2_VitA2: [String]
    MR1_VitA1: [String]
    OPV_3_IPV2_Penta3_Rota3: [String]
    OPV_2_Penta_2_Rota_2: [String]
    OPV1_IPV1_Penta1_Rota1: [String]
    BCG: [String]
    B2VIT: [String]
    OPV: [String]
  }
  input ChildrenInput
  {
    childrenObjectId:ID
    eligibleCoupleNameObjectId:ID
    coupleid: Int
    childname: String
    childRCH: String
    vaccination: VaccinationInput
  }

  input MembersInput
  {
    memberid:ID
    membername: String
    age: Int
    sex: String
    addhar_no: Float
    mobile_no:String
    bank_acc: String
    bank_name: String
    disability_type: [String]
    disease: [String]
    modality: [String]
  }
  input GeneralInput
  {
    totalMembers: Int
    toilet: Boolean
    house: Boolean
    waterSupply: Boolean
    publicBoreHandpump: String
    category: String
    belowPovertyLine: Boolean
  }
  
  input AutogeneratedMainInput
  {
    ashaWorkerObjectid: ID!   

    areaname: String
    eligibleCoupleName: [EligibleCoupleNameInput]
    pregnancy: [PregnancyInput]
    children: [ChildrenInput]
    members: [MembersInput]
    general: GeneralInput
  }


  type RootQuery
  {
    getFamilies(ashaWorkerObjectid:ID): [AutogeneratedMainType]
    getFamily(_id:ID):AutogeneratedMainType
    getAshaWorker(_id:ID):AshaWorker
    searchName(name:String):[AutogeneratedMainType]
    
  }

  type RootMutation
  { 
    createFamily(input:AutogeneratedMainInput):AutogeneratedMainType
    
    updateGeneralInfo(id:ID!,input:GeneralInput):modifiedMongo
    updateMembers(memberid:ID!,input:MembersInput):modifiedMongo
    updateEligibleCoupleName(eligibleCoupleNameId:ID!,input:EligibleCoupleNameInput):modifiedMongo
    updateChildren(childrenObjectId:ID!,input:ChildrenInput):modifiedMongo
    updatePregnancy(pregnancyId:ID!,input:PregnancyInput):modifiedMongo

    addMembers(id:ID!,input:[MembersInput]):modifiedMongo
    addEligibleCoupleName(id:ID!,input:[EligibleCoupleNameInput]):modifiedMongo
    addChildren(id:ID!,input:[ChildrenInput]):modifiedMongo
    addPregnancy(id:ID!,input:[PregnancyInput]):modifiedMongo


  }

  schema
  {
    query: RootQuery
    mutation: RootMutation
  }

    `)
