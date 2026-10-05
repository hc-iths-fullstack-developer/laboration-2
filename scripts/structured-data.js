const loader = document.currentScript;
const jsonPath = loader.dataset.json;

const addStructuredData = async () => {
  try {
    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error(`Could not load structured data: ${response.status}`);
    }

    const data = await response.json();
    const script = document.createElement('script');

    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);

    document.head.appendChild(script);
  } catch (error) {
    console.error(error);
  }
};

addStructuredData();
