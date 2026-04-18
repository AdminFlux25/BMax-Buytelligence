import intelligentOrdering from "./capabilities/intelligentOrdering";
import askDontSearch from "./capabilities/askDontSearch";
import smartRefill from "./capabilities/smartRefill";
import predictiveService from "./capabilities/predictiveService";
import stockAwareness from "./capabilities/stockAwareness";
import goalDriven from "./capabilities/goalDriven";
import financeAssistant from "./capabilities/financeAssistant";
import familyProfiles from "./capabilities/familyProfiles";
import AlertEngine from "./AlertEngine";

export default class BMaxEngine {
  constructor(state, setState) {
    this.state = state;
    this.setState = setState;
    this.alerts = new AlertEngine(state, setState);
  }

  runCapability(name, payload) {
    const capabilities = {
      intelligentOrdering,
      askDontSearch,
      smartRefill,
      predictiveService,
      stockAwareness,
      goalDriven,
      financeAssistant,
      familyProfiles
    };

    const result =  capabilities[name](this.state, this.setState, payload);

    // After every capability, run predictive alerts
    this.alerts.runAll();

    return result;
  }
}
