const { node } = require("@opentelemetry/sdk-node");

const { NodeTracerProvider } = node;

const opentelemetry = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  getNodeAutoInstrumentations
} = require("@opentelemetry/auto-instrumentations-node");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes
} = require("@opentelemetry/semantic-conventions");
const {
  OTLPTraceExporter
} = require("@opentelemetry/exporter-trace-otlp-http");

const sdks = [];

const exporter = new OTLPTraceExporter();

module.exports = (serviceName) => {
  if (sdks[serviceName]) return sdks[serviceName];

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName
    })
  });

  provider.addSpanProcessor(
    new BatchSpanProcessor(exporter, {
      // The maximum queue size. After the size is reached spans are dropped.
      maxQueueSize: 1000,
      // The interval between two consecutive exports
      scheduledDelayMillis: 30000
    })
  );
  provider.register();
  registerInstrumentations({
    instrumentations: getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": {
        enabled: false
      }
    })
  });

  return opentelemetry.trace.getTracer(serviceName);
};
