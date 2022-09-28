// TODO: if I mock this file, I need to preserve the original isRegistration function. Probably better to test the registration file instead of the main function?

/* jest.mock('../EnrollRegisteredStudent', ()=>{ */
/*   // mock implementation so we don't send anything to Canvas */
/*   return {enrollRegisteredStudent: ()=>{}} */
/* }) */

import {isRegistration} from './index'

test('An AddRegistration message should be considered a registration',()=>{
    const result = isRegistration(`<ns0:membershipRecord xmlns:ns0=\"http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0\"><ns0:sourcedGUID><ns0:sourcedId>4b61d1da-29fd-11ed-a11c-e9724fb943a0b3a83064-e657-11ec-a24b-2f106c30474a</ns0:sourcedId></ns0:sourcedGUID><ns0:membership><ns0:collectionSourcedId>b3a83064-e657-11ec-a24b-2f106c30474a</ns0:collectionSourcedId><ns0:membershipIdType>courseOffering</ns0:membershipIdType><ns0:member><ns0:personSourcedId>4b61d1da-29fd-11ed-a11c-e9724fb943a0</ns0:personSourcedId><ns0:role><ns0:roleType>Learner</ns0:roleType><ns0:timeFrame><ns0:begin></ns0:begin><ns0:end></ns0:end></ns0:timeFrame><ns0:status>Active</ns0:status><ns0:extension><ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary><ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/cmsv1p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary><ns0:extensionField><ns0:fieldName>Admitted</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Registered</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Break</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Dropout</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>OriginEvent</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>LADOK.AddRegistration</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>EarlyAccess</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.latter.part</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.root.packaging</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.instance.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>50777</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>CM2019</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>a9c4c7d0-0c98-11eb-9b6d-ec80b1744913</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.version.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>a9c4a0b4-0c98-11eb-9b6d-ec80b1744913</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.type.id</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>52</ns0:fieldValue></ns0:extensionField></ns0:extension></ns0:role></ns0:member></ns0:membership></ns0:membershipRecord>`)
      
      expect(result).toBe(true)
})
test('A ReRegistration message should be considered a registration',()=>{
    const result = isRegistration(`<ns0:membershipRecord xmlns:ns0=\"http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0\"><ns0:sourcedGUID><ns0:sourcedId>4b61d1da-29fd-11ed-a11c-e9724fb943a0b3a83064-e657-11ec-a24b-2f106c30474a</ns0:sourcedId></ns0:sourcedGUID><ns0:membership><ns0:collectionSourcedId>b3a83064-e657-11ec-a24b-2f106c30474a</ns0:collectionSourcedId><ns0:membershipIdType>courseOffering</ns0:membershipIdType><ns0:member><ns0:personSourcedId>4b61d1da-29fd-11ed-a11c-e9724fb943a0</ns0:personSourcedId><ns0:role><ns0:roleType>Learner</ns0:roleType><ns0:timeFrame><ns0:begin></ns0:begin><ns0:end></ns0:end></ns0:timeFrame><ns0:status>Active</ns0:status><ns0:extension><ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary><ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/cmsv1p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary><ns0:extensionField><ns0:fieldName>Admitted</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Registered</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Break</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Dropout</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>OriginEvent</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>LADOK.AddRegistration</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>EarlyAccess</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.latter.part</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.root.packaging</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.instance.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>50777</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>CM2019</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>a9c4c7d0-0c98-11eb-9b6d-ec80b1744913</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.version.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>a9c4a0b4-0c98-11eb-9b6d-ec80b1744913</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.type.id</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>52</ns0:fieldValue></ns0:extensionField></ns0:extension></ns0:role></ns0:member></ns0:membership></ns0:membershipRecord>`)
      
      expect(result).toBe(true)
})
test('A DeRegistration message should NOT be considered a registration',()=>{
    const result = isRegistration(`<ns0:membershipRecord xmlns:ns0=\"http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0\"><ns0:sourcedGUID><ns0:sourcedId>4b61d1da-29fd-11ed-a11c-e9724fb943a0b3a83064-e657-11ec-a24b-2f106c30474a</ns0:sourcedId></ns0:sourcedGUID><ns0:membership><ns0:collectionSourcedId>b3a83064-e657-11ec-a24b-2f106c30474a</ns0:collectionSourcedId><ns0:membershipIdType>courseOffering</ns0:membershipIdType><ns0:member><ns0:personSourcedId>4b61d1da-29fd-11ed-a11c-e9724fb943a0</ns0:personSourcedId><ns0:role><ns0:roleType>Learner</ns0:roleType><ns0:timeFrame><ns0:begin></ns0:begin><ns0:end></ns0:end></ns0:timeFrame><ns0:status>Active</ns0:status><ns0:extension><ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary><ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/cmsv1p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary><ns0:extensionField><ns0:fieldName>Admitted</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Registered</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Break</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Dropout</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>OriginEvent</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>LADOK.AddRegistration</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>EarlyAccess</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.latter.part</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.root.packaging</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.instance.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>50777</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>CM2019</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>a9c4c7d0-0c98-11eb-9b6d-ec80b1744913</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.version.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>a9c4a0b4-0c98-11eb-9b6d-ec80b1744913</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.type.id</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>52</ns0:fieldValue></ns0:extensionField></ns0:extension></ns0:role></ns0:member></ns0:membership></ns0:membershipRecord>`)
      
      expect(result).toBe(false)
})
