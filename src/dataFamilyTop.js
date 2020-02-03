export default {
  name: "Ma",
  id: 3,
  isExpanded: true,
  children: [
    {
      name: "Grand Pa",
      id: 1,
      hasParnter: true,
      children: [
        {
          name: "Grand Pa2",
          id: 1000,
          hasParnter: true
        },
        {
          name: "Grand Ma2",
          id: 2000,
          partnerId: 1,
          gender: "Female",
          noParent: true
        }
      ]
    },
    {
      name: "Grand Ma",
      id: 2,
      partnerId: 1,
      gender: "Female",
      noParent: true
    }
  ]
};
