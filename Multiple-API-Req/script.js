const tbody = document.getElementById("tbody");
const fetchBtn = document.getElementById("fetchBtn");
const table = document.getElementById("tb");
let data;

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
    const userRes1 = await fetch("https://jsonplaceholder.typicode.com/users");
    const users1 = await userRes1.json();
    const userRes2 = await fetch("https://dummyjson.com/users");
    const users2 = await userRes2.json();

    data = [...users1, ...users2["users"]];
    console.log("data fetched", data);
    renderTable(data);
  } catch (e) {
    console.log(e);
  }
};

fetchBtn.addEventListener("click", handleFetch);
// handleFetch();
