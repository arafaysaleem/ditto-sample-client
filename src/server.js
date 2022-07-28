const { DittoNodeClient, NodeHttpBasicAuth } = require('@eclipse-ditto/ditto-javascript-client-node');

const domain = 'localhost:8080';
const username = 'ditto';
const password = 'ditto';

const client = DittoNodeClient.newHttpClient()
    .withoutTls()
    .withDomain(domain)
    .withAuthProvider(NodeHttpBasicAuth.newInstance(username, password))
    .build();

const getThing = async(thingId) => {
    const thingsHandle = client.getThingsHandle();
    const returnedThing = await thingsHandle.getThing(thingId);
    console.log(`Get returned ${JSON.stringify(returnedThing)}`);
};

const getSensorData = () => {
    return {
        voltage: Math.floor(Math.random() * (240 - 1) + 1),
        current: Math.floor(Math.random() * (100 - 1) + 1),
        temperature: Math.floor(Math.random() * (40 - 20) + 20)
    };
};

const putProperties = async(thingId, featureId, props) => {
    const featuresHandle = client.getFeaturesHandle(thingId);
    const result = await featuresHandle.putProperties(featureId, props);
    console.log(`Finished putting properties with result: ${JSON.stringify(result)}`);
};

const getThingFeatures = async(thingId) => {
    const featuresHandle = client.getFeaturesHandle(thingId);
    const returnedFeatures = await featuresHandle.getFeatures();
    console.log(`Get returned ${JSON.stringify(returnedFeatures)}`);
};

const getFeatureProperties = async(thingId, featureId) => {
    const featuresHandle = client.getFeaturesHandle(thingId);
    const returnedProps = await featuresHandle.getProperties(featureId);
    console.log(`Get returned ${JSON.stringify(returnedProps)}`);
};

const main = async() => {
    const thingId = 'org.eclipse.ditto:temp-sensor';
    const featureId = 'environment-scanner';

    // await getThing(thingId);
    // await getThingFeatures(thingId);
    // await getFeatureProperties(thingId, featureId);

    async function sendSensorData() {
        const props = getSensorData();
        await putProperties(thingId, featureId, props);
    };

    setInterval(sendSensorData, 5000);
};

main();