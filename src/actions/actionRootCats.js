import { gql } from "../helpers";

import { actionPromise } from "../reducers";

export const actionRootCats = () =>
    actionPromise(
        "rootCats",
        gql(
            `query rootCats($query:String) {
                CategoryFind(query: $query){
                    _id name
                }
            }`,
            {
                query: JSON.stringify([
                    {
                        parent: null,
                    },
                ]),
            }
        )
    );

// () => ({
//     data: [
//         {
//             id: 1,
//             name: 'Categoty 1',
//         },
//         {
//             id: 2,
//             name: 'Categoty 2',
//         },
//         {
//             id: 3,
//             name: 'Categoty 3',
//         },
//         {
//             id: 4,
//             name: 'Categoty 4',
//         },
//     ],
// }),

// .then((data) => {
//     if (data.errors) {
//         throw new Error(JSON.stringify(data.errors));
//     } else return Object.values(data.data)[0];
// })
// fetch(backendURL + "/api/reception/patient/", {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         ...(localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {}),
//     },
// });

// actionPromise("patientAll",    fetch(url, {
//     type:"GET",
//     headers: {
//         "Content-Type": "application/json",
//         ...(localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {}),
//     },
//     body: data,
// })
//     .then((res) => res.json())
//     .then((data) => {
//         if (typeof data === "string") {
//             throw new Error(data);
//         } else return Object.values(data);
//     }))
