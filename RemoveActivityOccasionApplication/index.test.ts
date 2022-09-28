
import {isRemoveActivityOccasionApplication} from './index'

test('An AddRegistration message should NOT be considered a removeActivity',()=>{
    const result = isRemoveActivityOccasionApplication(`
<ns0:membershipRecord xmlns:ns0="http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0">
   <ns0:sourcedGUID>
      <ns0:sourcedId>d7a5ac5e-9627-11e8-bf01-45625eef45e23795fe1f-4837-11eb-bec3-d5a2938f4dea</ns0:sourcedId>
   </ns0:sourcedGUID>
   <ns0:membership>
      <ns0:collectionSourcedId>3795fe1f-4837-11eb-bec3-d5a2938f4dea</ns0:collectionSourcedId>
      <ns0:membershipIdType>courseOffering</ns0:membershipIdType>
      <ns0:member>
         <ns0:personSourcedId>d7a5ac5e-9627-11e8-bf01-45625eef45e2</ns0:personSourcedId>
         <ns0:role>
            <ns0:roleType>Learner</ns0:roleType>
            <ns0:timeFrame>
               <ns0:begin />
               <ns0:end />
            </ns0:timeFrame>
            <ns0:status>Active</ns0:status>
            <ns0:extension>
               <ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary>
               <ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/cmsv1p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary>
               <ns0:extensionField>
                  <ns0:fieldName>Admitted</ns0:fieldName>
                  <ns0:fieldType>Boolean</ns0:fieldType>
                  <ns0:fieldValue>true</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>Registered</ns0:fieldName>
                  <ns0:fieldType>Boolean</ns0:fieldType>
                  <ns0:fieldValue>true</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>Break</ns0:fieldName>
                  <ns0:fieldType>Boolean</ns0:fieldType>
                  <ns0:fieldValue>false</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>Dropout</ns0:fieldName>
                  <ns0:fieldType>Boolean</ns0:fieldType>
                  <ns0:fieldValue>false</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>OriginEvent</ns0:fieldName>
                  <ns0:fieldType>string</ns0:fieldType>
                  <ns0:fieldValue>LADOK.AddRegistration</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>EarlyAccess</ns0:fieldName>
                  <ns0:fieldType>Boolean</ns0:fieldType>
                  <ns0:fieldValue>false</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>participation.program.code</ns0:fieldName>
                  <ns0:fieldType>string</ns0:fieldType>
                  <ns0:fieldValue>TIBYH</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>participation.programdirection.code</ns0:fieldName>
                  <ns0:fieldType>string</ns0:fieldType>
                  <ns0:fieldValue>HUPK</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>education.is.latter.part</ns0:fieldName>
                  <ns0:fieldType>Boolean</ns0:fieldType>
                  <ns0:fieldValue>false</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>education.is.root.packaging</ns0:fieldName>
                  <ns0:fieldType>Boolean</ns0:fieldType>
                  <ns0:fieldValue>false</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>education.code</ns0:fieldName>
                  <ns0:fieldType>string</ns0:fieldType>
                  <ns0:fieldValue>AF179X</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>education.instance.code</ns0:fieldName>
                  <ns0:fieldType>string</ns0:fieldType>
                  <ns0:fieldValue>50069</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>education.uid</ns0:fieldName>
                  <ns0:fieldType>string</ns0:fieldType>
                  <ns0:fieldValue>2aee98c0-73d8-11e8-afa7-8e408e694e54</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>education.version.uid</ns0:fieldName>
                  <ns0:fieldType>string</ns0:fieldType>
                  <ns0:fieldValue>2ae83041-73d8-11e8-b4e0-063f9afb40e3</ns0:fieldValue>
               </ns0:extensionField>
               <ns0:extensionField>
                  <ns0:fieldName>education.type.id</ns0:fieldName>
                  <ns0:fieldType>string</ns0:fieldType>
                  <ns0:fieldValue>52</ns0:fieldValue>
               </ns0:extensionField>
            </ns0:extension>
         </ns0:role>
      </ns0:member>
   </ns0:membership>
</ns0:membershipRecord>`)
      
      expect(result).toBeFalsy()
})

test('A removeActivity message should be handled',()=>{
    const result = isRemoveActivityOccasionApplication(`
<ns0:membershipRecord xmlns:ns0="http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0">
   <ns0:membership>
      <ns0:collectionSourcedId>002baa7a-88e6-11ec-bc70-adb799404101</ns0:collectionSourcedId>
      <ns0:membershipIdType>ExaminationRegistration</ns0:membershipIdType>
      <ns0:member>
         <ns0:personSourcedId>7451ed4c-4376-11eb-aa19-cdd070ea4b24</ns0:personSourcedId>
         <ns0:role>
            <ns0:roleType>Student</ns0:roleType>
            <ns0:status>Inactive</ns0:status>
            <ns0:dataSource>Ladok</ns0:dataSource>
            <ns0:extension>
               <ns0:extensionField>
                  <ns0:fieldName>OriginEvent</ns0:fieldName>
                  <ns0:fieldType>string</ns0:fieldType>
                  <ns0:fieldValue>LADOK.RemoveActivityOccasionApplication</ns0:fieldValue>
               </ns0:extensionField>
            </ns0:extension>
         </ns0:role>
      </ns0:member>
   </ns0:membership>
</ns0:membershipRecord>`)
      
      expect(result).toBeTruthy()
})
