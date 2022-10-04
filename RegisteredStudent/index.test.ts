import { isRegistration} from "./index";

test("An AddRegistration message should be considered a registration of a student", () => {
  const result = isRegistration(`<ns0:membershipRecord
	xmlns:ns0=\"http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0\">
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


