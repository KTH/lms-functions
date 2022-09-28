import {isRegistration} from './index'

test('An AddRegistration message should be considered a registration',()=>{
    const result = isRegistration(`<ns0:membershipRecord xmlns:ns0=\"http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0\"><ns0:sourcedGUID><ns0:sourcedId>4b61d1da-29fd-11ed-a11c-e9724fb943a0b3a83064-e657-11ec-a24b-2f106c30474a</ns0:sourcedId></ns0:sourcedGUID><ns0:membership><ns0:collectionSourcedId>b3a83064-e657-11ec-a24b-2f106c30474a</ns0:collectionSourcedId><ns0:membershipIdType>courseOffering</ns0:membershipIdType><ns0:member><ns0:personSourcedId>4b61d1da-29fd-11ed-a11c-e9724fb943a0</ns0:personSourcedId><ns0:role><ns0:roleType>Learner</ns0:roleType><ns0:timeFrame><ns0:begin></ns0:begin><ns0:end></ns0:end></ns0:timeFrame><ns0:status>Active</ns0:status><ns0:extension><ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary><ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/cmsv1p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary><ns0:extensionField><ns0:fieldName>Admitted</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Registered</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Break</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Dropout</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>OriginEvent</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>LADOK.AddRegistration</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>EarlyAccess</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.latter.part</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.root.packaging</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.instance.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>50777</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>CM2019</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>a9c4c7d0-0c98-11eb-9b6d-ec80b1744913</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.version.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>a9c4a0b4-0c98-11eb-9b6d-ec80b1744913</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.type.id</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>52</ns0:fieldValue></ns0:extensionField></ns0:extension></ns0:role></ns0:member></ns0:membership></ns0:membershipRecord>`)
      
      expect(result).toBeTruthy()
})

test('A ReRegistration message should be considered a registration',()=>{
    const result = isRegistration(`<ns0:courseOfferingRecord xmlns:ns0=\"http://www.imsglobal.org/services/lis/cmsv1p0/wsdl11/sync/imscms_v1p0\"><ns0:sourcedGUID><ns0:sourcedId>06f81de0-1d7e-11ea-a622-3565135944de</ns0:sourcedId></ns0:sourcedGUID><ns0:courseOffering><ns0:label><ns0:language>sv-SE</ns0:language><ns0:textString>50440</ns0:textString></ns0:label><ns0:title><ns0:language>sv-SE</ns0:language><ns0:textString>ME1039</ns0:textString></ns0:title><ns0:parentTemplateId>682bef99-73d8-11e8-afa7-8e408e694e54</ns0:parentTemplateId><ns0:catalogDescription><ns0:shortDescription><ns0:language>sv-SE</ns0:language><ns0:textString>50440</ns0:textString></ns0:shortDescription><ns0:longDescription><ns0:language>sv-SE</ns0:language><ns0:textString>Industriell Ekonomi och Entreprenörskap inom Media och IKT HT2020</ns0:textString></ns0:longDescription></ns0:catalogDescription><ns0:defaultCredits><ns0:language>sv-SE</ns0:language><ns0:textString>7.5</ns0:textString></ns0:defaultCredits><ns0:academicSession><ns0:language>sv-SE</ns0:language><ns0:textString>HT2020</ns0:textString></ns0:academicSession><ns0:org><ns0:orgUnit><ns0:language>sv-SE</ns0:language><ns0:textString>ME</ns0:textString></ns0:orgUnit><ns0:id><ns0:language>sv-SE</ns0:language><ns0:textString>ebf33434-73d6-11e8-8c58-f9aa7f7e4fb6</ns0:textString></ns0:id></ns0:org><ns0:timeFrame><ns0:begin>2020-08-24T00:00:00</ns0:begin><ns0:end>2020-10-23T00:00:00</ns0:end></ns0:timeFrame><ns0:extension><ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary><ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/cmsv1p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary><ns0:extensionField><ns0:fieldName>Tempo</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>Halvfart</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>TeachingTime</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>Dagtid</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>CourseTitle</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>Industriell Ekonomi och Entreprenörskap inom Media och IKT</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>ParentTemplateCode</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>ME1039</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Location</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>KTH Campus</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>OriginEvent</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>LADOK.AddReRegistration</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>ParentTemplateId</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>46f10af4-5f82-11e9-b67f-a77d6cb34fef</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>TeachingTimeCode</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>DAG</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>TempoCode</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>50</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>TeachingTypeCode</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>NML</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>FinancingType</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>101050</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>CourseTitleEnglish</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>Industrial Management and Entrepreneurship for Media and ICT</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>ParentTemplateDefaultCredits</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>7.5</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.locality.name</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>KTH Campus</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.level.name</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>Grundnivå</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.language.id</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>2</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.type.id</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>52</ns0:fieldValue></ns0:extensionField></ns0:extension></ns0:courseOffering></ns0:courseOfferingRecord>`)
      
      expect(result).toBeTruthy()
})

test('A RemoveActivity message should NOT be considered a registration',()=>{
    const result = isRegistration(`<ns0:membershipRecord xmlns:ns0=\"http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0\"><ns0:membership><ns0:collectionSourcedId>002baa7a-88e6-11ec-bc70-adb799404101</ns0:collectionSourcedId><ns0:membershipIdType>ExaminationRegistration</ns0:membershipIdType><ns0:member><ns0:personSourcedId>7451ed4c-4376-11eb-aa19-cdd070ea4b24</ns0:personSourcedId><ns0:role><ns0:roleType>Student</ns0:roleType><ns0:status>Inactive</ns0:status><ns0:dataSource>Ladok</ns0:dataSource><ns0:extension><ns0:extensionField><ns0:fieldName>OriginEvent</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>LADOK.RemoveActivityOccasionApplication</ns0:fieldValue></ns0:extensionField></ns0:extension></ns0:role></ns0:member></ns0:membership></ns0:membershipRecord>`)
      
      expect(result).toBeFalsy()

})