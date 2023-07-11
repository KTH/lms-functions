export function generateMessage(extraFields: string[], roleType = 'Learner', eventType = 'LADOK.AddRegistration'): string {
  return `<ns0:membershipRecord
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
				<ns0:roleType>${roleType}</ns0:roleType>
				<ns0:status>Active</ns0:status>
				<ns0:extension>
					<ns0:extensionNameVocabulary>LocallyDefined</ns0:extensionNameVocabulary>
					<ns0:extensionTypeVocabulary>http://www.imsglobal.org/lis/cmsv1p0/extensionvocabularyv1p0</ns0:extensionTypeVocabulary>
					${extraFields.join("\n")}
					<ns0:extensionField>
						<ns0:fieldName>OriginEvent</ns0:fieldName>
						<ns0:fieldType>string</ns0:fieldType>
						<ns0:fieldValue>${eventType}</ns0:fieldValue>
					</ns0:extensionField>
				</ns0:extension>
			</ns0:role>
		</ns0:member>
	</ns0:membership>
</ns0:membershipRecord>`;
}

export function generateBoolExtField(name: string, value: boolean): string {
  return `<ns0:extensionField>
  <ns0:fieldName>${name}</ns0:fieldName>
  <ns0:fieldType>Boolean</ns0:fieldType>
  <ns0:fieldValue>${value}</ns0:fieldValue>`;
}

export function generateStrExtField(name: string, value: string): string {
  return `<ns0:extensionField>
  <ns0:fieldName>${name}</ns0:fieldName>
  <ns0:fieldType>string</ns0:fieldType>
  <ns0:fieldValue>${value}</ns0:fieldValue>`;
}
