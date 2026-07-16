const search = document.getElementById("search");
const tableBody = document.getElementById("tableBody");
let userData;

const renderData = (arr) => {
  const users = arr
    .map(
      ({ id, name, email, address }) =>
        `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${address["city"]}</td>
        </tr>
    `,
    )
    .join("");
  tableBody.innerHTML = users;
};

async function fetchUsers() {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const response = await data.json();
    console.log(response);
    userData = response;
    renderData(userData);
    return;
  } catch (error) {
    console.log("massage", error);
  }
}

const filterName = (e) => {
  const searchVal = e.target.value.toLowerCase().trim();
  const filterData = userData.filter(({ name }) =>
    name.toLowerCase().includes(searchVal),
  );
  renderData(filterData);
};

search.addEventListener("input", (e) => {
  filterName(e);
});

fetchUsers();
