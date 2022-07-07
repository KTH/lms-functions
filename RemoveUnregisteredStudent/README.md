# How to test the function

1. Prerequisites:
- a student enrolled to a course in Canvas
- the LADOK id of the course (aktivitetstillfälle/activity round id)
- the LADOK id of the student

2. Prepare an XML-message to use as trigger for the function:

```XML
<ns0:membershipRecord xmlns:ns0=\"http://www.imsglobal.org/services/lis/mms2p0/wsdl11/sync/imsmms_v2p0\">
    <ns0:membership>
        <ns0:collectionSourcedId>[LADOK Activity Round ID]</ns0:collectionSourcedId>
        <ns0:membershipIdType>ExaminationRegistration</ns0:membershipIdType>
        <ns0:member>
            <ns0:personSourcedId>[Student LADOK ID]</ns0:personSourcedId>
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
</ns0:membershipRecord>
```

3. Use the prepared Azure Functions trigger in Postman

    https://lively-rocket-948078.postman.co/workspace/E-l%25C3%25A4rande~7998ca2d-3d65-4019-99fb-775e68a101b9/request/17526432-807cfb41-2028-4588-9acf-84148d7a31bf

