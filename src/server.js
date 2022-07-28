const { DittoNodeClient, NodeHttpBasicAuth, DefaultFieldsOptions } = require('@eclipse-ditto/ditto-javascript-client-node');

const getThing = async(client, thingId) => {
    const thingsHandle = client.getThingsHandle();
    const options = DefaultFieldsOptions.getInstance();
    options.ifMatch('A Tag').withFields('thingId', 'policyId', '_modified');
    const returnedThing = await thingsHandle.getThing(thingId, options);
    console.log(`Get returned ${JSON.stringify(returnedThing)}`);
};

// const putThing = async() => {
//     const thing = new Thing('the:thing');
//     const result = await thingsHandle.putThing(thing);
//     console.log(`Finished putting thing with result: ${JSON.stringify(result)}`);
// };

const getThingFeatures = async(client, thingId) => {
    const featuresHandle = client.getFeaturesHandle(thingId);
    const returnedFeatures = await featuresHandle.getFeatures();
    console.log(`Get returned ${JSON.stringify(returnedFeatures)}`);
};

const getFeatureProperties = async(client, thingId, featureId) => {
    const featuresHandle = client.getFeaturesHandle(thingId);
    const returnedProps = await featuresHandle.getProperties(featureId);
    console.log(`Get returned ${JSON.stringify(returnedProps)}`);
};

const main = async() => {
    const domain = 'localhost:8080';
    const username = 'ditto';
    const password = 'ditto';

    const client = DittoNodeClient.newHttpClient()
        .withoutTls()
        .withDomain(domain)
        .withAuthProvider(NodeHttpBasicAuth.newInstance(username, password))
        .build();

    await getThing(client, 'org.eclipse.ditto:temp-sensor');
    await getThingFeatures(client, 'org.eclipse.ditto:temp-sensor');
    await getFeatureProperties(client, 'org.eclipse.ditto:temp-sensor', 'environment-scanner');
};

main();