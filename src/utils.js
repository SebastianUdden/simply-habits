export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getSaved = () =>
  JSON.parse(localStorage.getItem("simply-habits") || "{}");

export const save = (value) =>
  localStorage.setItem("simply-habits", JSON.stringify(value));

const createFile = (data, filename, type) => {
  const file = new Blob([data], { type: type });
  var a = document.createElement("a"),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  a.style.color = "#000";
  const exportEl = document.getElementById("export");
  if (exportEl) {
    exportEl.style.marginTop = "15px";
    exportEl.style.marginBottom = "15px";
    var text = document.createTextNode(filename);
    a.appendChild(text);
    exportEl.innerHTML = "";
    exportEl.appendChild(a);
  }
};

const addZero = (value) => {
  const number = Number.parseInt(value);
  return number < 10 ? `0${number}` : number;
};

const formatFileName = (key) => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = addZero(now.getUTCMonth());
  const date = addZero(now.getUTCDate());
  const hours = addZero(now.getUTCHours());
  const minutes = addZero(now.getUTCMinutes());
  return `${key}-${year}-${month}-${date}_${hours}-${minutes}.json`;
};

// <button onClick={() => exportData("simply-habits")}>Export</button>
// <div id="export" />
export const exportData = (key) => {
  const data = localStorage.getItem(key);
  const filename = formatFileName(key);
  createFile(JSON.stringify(data), filename, "application/json");
};

const saveAndReload = (key, blob) => {
  localStorage.setItem(key, JSON.parse(blob));
  window.location.reload();
};

// <input type="file" id="input" onChange={(e) => importData("simply-habits", e)} />
export const importData = async (key, e) => {
  const blob = e.target.files[0];
  if (blob && blob.text) {
    console.log({ blob });
    blob.text().then((text) => saveAndReload(key, text));
  } else if (blob) {
    const text = await new Response(blob).text();
    saveAndReload(key, text);
  }
};
