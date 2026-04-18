import familyProfiles from "../../data/familyProfiles.json";

export default function familyProfilesCapability(state, setState, { profile }) {
  const selected = familyProfiles[profile];

  setState(prev => ({
    ...prev,
    familyProfile: profile,
    recommendations: selected.recentOrders
  }));

  return selected;
}
