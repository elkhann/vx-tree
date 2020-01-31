export default {
  name: "",
  isExpanded: true,
  children: [
    {
      name: "J A",
      id: 1,
      gender: "Female",
      hasParnter: true,
      imageUrl: "/avatar/gravator.jpg"
    },
    {
      name: "Mr. J A",
      id: 2,
      partnerId: 1,
      noParent: true,
      children: [
        {
          name: "P A",
          id: 3,
          gender: "Female",
          isSource: true,
          hasParnter: true
        },
        {
          name: "MK N A",
          id: 5,
          partnerId: 3,
          gender: "Male",
          noParent: true,
          children: [
            {
              name: "B K",
              id: 100,
              hasParnter: true
            },
            {
              name: "D MM",
              id: 1022,
              partnerId: 100,
              gender: "Female",
              noParent: true,
              children: [{ name: "Dd MM", gender: "Female" }]
            },
            {
              name: "MM D",
              id: 102,
              partnerId: 100,
              gender: "Female",
              noParent: true,
              children: [{ name: "Bdd MM" }]
            },
            {
              name: "V PK",
              id: 200,
              gender: "Female",
              hasParnter: true,
              imageUrl: "/avatar/v-pk.jpeg"
            },
            {
              name: "EK T N",
              id: 201,
              partnerId: 200,
              noParent: true,
              children: [
                {
                  name: "S PK",
                  gender: "Female"
                },
                {
                  name: "Sku PK"
                },
                {
                  name: "Sj PK"
                },
                {
                  name: "Ska PK"
                }
              ]
            },

            {
              name: "V K",
              id: 300,
              hasParnter: true,
              imageUrl: "/avatar/v-k.jpeg"
            },
            {
              name: "M PGFF",
              gender: "Female",
              id: 301,
              partnerId: 300,
              noParent: false,
              children: [
                {
                  name: "V Kd",
                  id: 3001,
                  imageUrl: "/avatar/v-k-1.jpeg"
                },
                {
                  name: "V KVd"
                }
              ]
            },
            {
              name: "R PK",
              id: 400,
              hasParnter: true
            },
            {
              name: "S VV",
              gender: "Female",
              id: 401,
              partnerId: 400,
              noParent: true,
              children: [
                {
                  name: "A R",
                  gender: "Female"
                },
                {
                  name: "C K"
                }
              ]
            }
          ]
        },

        {
          name: "Dummy",
          id: 4,
          partnerId: 3,
          gender: "Male",
          noParent: true,
          imageUrl: "/avatar/dummy.png",
          children: [
            {
              name: "Sam"
            },
            {
              name: "Thomas"
            }
          ]
        }
      ]
    }
  ]
};
