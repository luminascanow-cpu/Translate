async function run() {
  const apiKey = "AQ.Ab8RN6KDNYnZATz5iYWgDygFQIAmpa-Ci_0FMMQW_dng-T-1rw";
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {
    console.log("Error:", e.message);
  }
}
run();
