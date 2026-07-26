const tbody = document.getElementById("tbody");
const fetchBtn = document.getElementById("fetchBtn");
const table = document.getElementById("tb");
let userData;

const renderTable = (arr) => {
  const renderArr = arr
    .map(
      ({ name, firstName, lastName, email, phone, address }, index) =>
        `
        <tr>
        <td>${index + 1}</td>
        <td>${name || `${firstName} ${lastName}`}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${address.city}</td>
        </tr>
    `,
    )
    .join("");
  table.style.display = "block";
  tbody.innerHTML = renderArr;
};

const handleFetch = async () => {
  try {
    console.time("total time");
    const [userData1, userData2] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json(),
      ),
      fetch("https://dummyjson.com/users").then((res) => res.json()),
    ]);
    console.timeEnd("total time");

    userData = [...userData1, ...userData2["users"]];
    console.log("data fetched", userData);
    renderTable(userData);
  } catch (e) {
    console.log(e);
  }
};

fetchBtn.addEventListener("click", handleFetch);
// handleFetch();
