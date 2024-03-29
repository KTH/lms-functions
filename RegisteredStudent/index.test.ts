import { isRegistration } from "./index";

test("An AddRegistration message should be considered a registration of a student", () => {
  const result = isRegistration(`<ns0:membershipRecord
	xmlns:ns0="http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0">
	<ns0:sourcedGUID>
		<ns0:sourcedId>0035b991-953c-11ec-823c-971220ed4206</ns0:sourcedId>
	</ns0:sourcedGUID>
	<ns0:membership>
		<ns0:collectionSourcedId>01137cb4-6251-11ec-bb6b-e957c4f74580</ns0:collectionSourcedId>
		<ns0:membershipIdType>courseOffering</ns0:membershipIdType>
		<ns0:member>
			<ns0:personSourcedId>704b782e-b573-11e7-96e6-896ca17746d1</ns0:personSourcedId>
			<ns0:role>
				<ns0:roleType>Learner</ns0:roleType>
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
				</ns0:extension>
			</ns0:role>
		</ns0:member>
	</ns0:membership>
</ns0:membershipRecord>`);

  expect(result).toBeTruthy();
});

test("A Re-Registration message should be considered a registration of a student", () => {
  const result = isRegistration(`
<ns0:membershipRecord
	xmlns:ns0="http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0">
	<ns0:sourcedGUID>
		<ns0:sourcedId>1374d1bb-5a95-11e8-9dae-241de8ab435c8280b0d7-626a-11ec-bb6b-e957c4f74580</ns0:sourcedId>
	</ns0:sourcedGUID>
	<ns0:membership>
		<ns0:collectionSourcedId>8280b0d7-626a-11ec-bb6b-e957c4f74580</ns0:collectionSourcedId>
		<ns0:membershipIdType>courseOffering</ns0:membershipIdType>
		<ns0:member>
			<ns0:personSourcedId>1374d1bb-5a95-11e8-9dae-241de8ab435c</ns0:personSourcedId>
			<ns0:role>
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
						<ns0:fieldValue>LADOK.AddReRegistration</ns0:fieldValue>
					</ns0:extensionField>
				</ns0:extension>
			</ns0:role>
		</ns0:member>
	</ns0:membership>
</ns0:membershipRecord>
                                `);

  expect(result).toBeTruthy();
});

test("This message should not make the app to crash", () => {
  const result = isRegistration(`
  <?xml version="1.0" encoding="UTF-8"?>
<ns0:personRecord xmlns:ns0="http://www.imsglobal.org/services/lis/pms2p0/wsdl11/sync/imspms_v2p0">
   <ns0:sourcedGUID>
      <ns0:sourcedId>d98a0d5f-b707-11ec-96e4-55918bf24e26</ns0:sourcedId>
   </ns0:sourcedGUID>
   <ns0:person>
      <ns0:name>
         <ns0:nameType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>FullName</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/nametypevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>FullName</ns0:textString>
            </ns0:instanceValue>
         </ns0:nameType>
         <ns0:partName>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>First</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>First</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Sven</ns0:textString>
            </ns0:instanceValue>
         </ns0:partName>
         <ns0:partName>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Last</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Last</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Svensson</ns0:textString>
            </ns0:instanceValue>
         </ns0:partName>
      </ns0:name>
      <ns0:address>
         <ns0:addressType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Temporary_Primary</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Temporary_Primary</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressType>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>NonfieldedStreetAddress1</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>NonfieldedStreetAddress1</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>KTH-vägen 0</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Postcode</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Postcode</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>00000</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>City</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>City</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Stockholm</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Country</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Country</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Sweden</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
      </ns0:address>
      <ns0:address>
         <ns0:addressType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Permanent_Primary</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Permanent_Primary</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressType>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>NonfieldedStreetAddress1</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>NonfieldedStreetAddress1</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>KTH-vägen 0</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Postcode</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Postcode</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>00000</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>City</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>City</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>STOCKHOLM</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Country</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Country</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Sverige</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
      </ns0:address>
      <ns0:contactinfo>
         <ns0:contactinfoType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>EmailPrimary</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/contactinfotypevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>EmailPrimary</ns0:textString>
            </ns0:instanceValue>
         </ns0:contactinfoType>
         <ns0:contactinfoValue>
            <ns0:language>sv-SE</ns0:language>
            <ns0:textString>SvenSvensson@kth.se</ns0:textString>
         </ns0:contactinfoValue>
      </ns0:contactinfo>
      <ns0:contactinfo>
         <ns0:contactinfoType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Mobile</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/contactinfotypevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Mobile</ns0:textString>
            </ns0:instanceValue>
         </ns0:contactinfoType>
         <ns0:contactinfoValue>
            <ns0:language>sv-SE</ns0:language>
            <ns0:textString>+46734870971</ns0:textString>
         </ns0:contactinfoValue>
      </ns0:contactinfo>
      <ns0:extension>
         <ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary>
         <ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/pmsv2p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary>
         <ns0:extensionField>
            <ns0:fieldName>PersonIdentityNumber</ns0:fieldName>
            <ns0:fieldType>string</ns0:fieldType>
            <ns0:fieldValue>1111111111111111</ns0:fieldValue>
         </ns0:extensionField>
         <ns0:extensionField>
            <ns0:fieldName>OriginEvent</ns0:fieldName>
            <ns0:fieldType>string</ns0:fieldType>
            <ns0:fieldValue>LADOK.AddAdmission</ns0:fieldValue>
         </ns0:extensionField>
         <ns0:extensionField>
            <ns0:fieldName>DeceasedFlag</ns0:fieldName>
            <ns0:fieldType>Boolean</ns0:fieldType>
            <ns0:fieldValue>false</ns0:fieldValue>
         </ns0:extensionField>
      </ns0:extension>
   </ns0:person>
</ns0:personRecord><?xml version="1.0" encoding="UTF-8"?>
<ns0:personRecord xmlns:ns0="http://www.imsglobal.org/services/lis/pms2p0/wsdl11/sync/imspms_v2p0">
   <ns0:sourcedGUID>
      <ns0:sourcedId>d98a0d5f-b707-11ec-96e4-55918bf24e26</ns0:sourcedId>
   </ns0:sourcedGUID>
   <ns0:person>
      <ns0:name>
         <ns0:nameType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>FullName</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/nametypevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>FullName</ns0:textString>
            </ns0:instanceValue>
         </ns0:nameType>
         <ns0:partName>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>First</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>First</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Sven</ns0:textString>
            </ns0:instanceValue>
         </ns0:partName>
         <ns0:partName>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Last</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Last</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Svensson</ns0:textString>
            </ns0:instanceValue>
         </ns0:partName>
      </ns0:name>
      <ns0:address>
         <ns0:addressType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Temporary_Primary</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Temporary_Primary</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressType>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>NonfieldedStreetAddress1</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>NonfieldedStreetAddress1</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>KTH-vägen 0</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Postcode</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Postcode</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>00000</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>City</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>City</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Stockholm</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Country</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Country</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Sweden</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
      </ns0:address>
      <ns0:address>
         <ns0:addressType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Permanent_Primary</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Permanent_Primary</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressType>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>NonfieldedStreetAddress1</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>NonfieldedStreetAddress1</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>KTH-vägen 0</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Postcode</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Postcode</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>00000</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>City</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>City</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>STOCKHOLM</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
         <ns0:addressPart>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Country</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/partnamevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceName>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Country</ns0:textString>
            </ns0:instanceName>
            <ns0:instanceValue>
               <ns0:language>sv-SE</ns0:language>
               <ns0:textString>Sverige</ns0:textString>
            </ns0:instanceValue>
         </ns0:addressPart>
      </ns0:address>
      <ns0:contactinfo>
         <ns0:contactinfoType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>EmailPrimary</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/contactinfotypevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>EmailPrimary</ns0:textString>
            </ns0:instanceValue>
         </ns0:contactinfoType>
         <ns0:contactinfoValue>
            <ns0:language>sv-SE</ns0:language>
            <ns0:textString>SvenSvensson@kth.se</ns0:textString>
         </ns0:contactinfoValue>
      </ns0:contactinfo>
      <ns0:contactinfo>
         <ns0:contactinfoType>
            <ns0:instanceIdentifier>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Mobile</ns0:textString>
            </ns0:instanceIdentifier>
            <ns0:instanceVocabulary>http://www.imsglobal.org/lis/pmsv2p0/contactinfotypevocabularyv1p0</ns0:instanceVocabulary>
            <ns0:instanceValue>
               <ns0:language>en-US</ns0:language>
               <ns0:textString>Mobile</ns0:textString>
            </ns0:instanceValue>
         </ns0:contactinfoType>
         <ns0:contactinfoValue>
            <ns0:language>sv-SE</ns0:language>
            <ns0:textString>+XXXXXXXXXXXX</ns0:textString>
         </ns0:contactinfoValue>
      </ns0:contactinfo>
      <ns0:extension>
         <ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary>
         <ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/pmsv2p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary>
         <ns0:extensionField>
            <ns0:fieldName>PersonIdentityNumber</ns0:fieldName>
            <ns0:fieldType>string</ns0:fieldType>
            <ns0:fieldValue>1111111111111111</ns0:fieldValue>
         </ns0:extensionField>
         <ns0:extensionField>
            <ns0:fieldName>OriginEvent</ns0:fieldName>
            <ns0:fieldType>string</ns0:fieldType>
            <ns0:fieldValue>LADOK.AddAdmission</ns0:fieldValue>
         </ns0:extensionField>
         <ns0:extensionField>
            <ns0:fieldName>DeceasedFlag</ns0:fieldName>
            <ns0:fieldType>Boolean</ns0:fieldType>
            <ns0:fieldValue>false</ns0:fieldValue>
         </ns0:extensionField>
      </ns0:extension>
   </ns0:person>
</ns0:personRecord>
	`);

  expect(result).toBeFalsy();
});

test("This should not crash (2)", () => {
  const result = isRegistration(
    `<ns0:membershipRecord xmlns:ns0="http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0"><ns0:sourcedGUID><ns0:sourcedId>1c909de8-b59a-11e7-96e6-896ca17746d10d4e304d-15a0-11ea-8191-b863e166428d</ns0:sourcedId></ns0:sourcedGUID><ns0:membership><ns0:collectionSourcedId>0d4e304d-15a0-11ea-8191-b863e166428d</ns0:collectionSourcedId><ns0:membershipIdType>courseOffering</ns0:membershipIdType><ns0:member><ns0:personSourcedId>1c909de8-b59a-11e7-96e6-896ca17746d1</ns0:personSourcedId><ns0:role><ns0:roleType>Learner</ns0:roleType><ns0:timeFrame><ns0:begin></ns0:begin><ns0:end></ns0:end></ns0:timeFrame><ns0:status>Active</ns0:status><ns0:extension><ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary><ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/cmsv1p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary><ns0:extensionField><ns0:fieldName>Admitted</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Registered</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>true</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Break</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>Dropout</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>OriginEvent</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>LADOK.AddRegistration</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>EarlyAccess</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>participation.program.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>TMAKM</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.root.packaging</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.is.latter.part</ns0:fieldName><ns0:fieldType>Boolean</ns0:fieldType><ns0:fieldValue>false</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>SF2955</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.instance.code</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>60851</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>8153e819-73d8-11e8-afa7-8e408e694e54</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.version.uid</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>8164d849-73d8-11e8-afa7-8e408e694e54</ns0:fieldValue></ns0:extensionField><ns0:extensionField><ns0:fieldName>education.type.id</ns0:fieldName><ns0:fieldType>string</ns0:fieldType><ns0:fieldValue>52</ns0:fieldValue></ns0:extensionField></ns0:extension></ns0:role></ns0:member></ns0:membership></ns0:membershipRecord>`
  );

  expect(result).toBe(true);
});
