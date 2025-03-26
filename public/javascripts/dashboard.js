  const complaintsData = <%- JSON.stringify(complaints) %>; // From server-side

    // Total Complaints
    const totalComplaints = complaintsData.length;

    // Solved Complaints
    const solvedComplaints = complaintsData.filter(
      (complaint) => complaint.status === "Solved"
    ).length;

    // Pending Complaints
    const pendingComplaints = totalComplaints - solvedComplaints;

    // Update Info Boxes
    document.getElementById("total-complaints").textContent = totalComplaints;
    document.getElementById("solved-complaints").textContent = solvedComplaints;
    document.getElementById("pending-complaints").textContent = Math.max(
      pendingComplaints,
      0
    );

    // Solved Percentage Chart
    const solvedPercentage = totalComplaints > 0 
      ? Math.round((solvedComplaints / totalComplaints) * 100) 
      : 0;

    const solvedPercentageCtx = document
      .getElementById("solvedPercentageChart")
      .getContext("2d");

    new Chart(solvedPercentageCtx, {
      type: "doughnut",
      data: {
        labels: ["Solved", "Pending"],
        datasets: [
          {
            data: [solvedComplaints, Math.max(pendingComplaints, 0)],
            backgroundColor: ["#4caf50", "#f44336"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
        },
        cutout: "70%",
      },
    });

    // Complaints by Urgency
    const urgencyCounts = complaintsData.reduce((acc, complaint) => {
      acc[complaint.urgency] = (acc[complaint.urgency] || 0) + 1;
      return acc;
    }, {});

    new Chart(document.getElementById("urgencyChart"), {
      type: "doughnut",
      data: {
        labels: Object.keys(urgencyCounts),
        datasets: [
          {
            data: Object.values(urgencyCounts),
            backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
          },
        ],
      },
    });

    // Issue Types Distribution
    const issueCounts = complaintsData.reduce((acc, complaint) => {
      acc[complaint.issuetype] = (acc[complaint.issuetype] || 0) + 1;
      return acc;
    }, {});

    new Chart(document.getElementById("issuePieChart"), {
      type: "pie",
      data: {
        labels: Object.keys(issueCounts),
        datasets: [
          {
            data: Object.values(issueCounts),
            backgroundColor: ["#4caf50", "#2196f3", "#ffc107", "#f44336"],
          },
        ],
      },
    });

    // Complaints by Location
    const locationCounts = complaintsData.reduce((acc, complaint) => {
      acc[complaint.location] = (acc[complaint.location] || 0) + 1;
      return acc;
    }, {});

    new Chart(document.getElementById("locationBarChart"), {
      type: "bar",
      data: {
        labels: Object.keys(locationCounts),
        datasets: [
          {
            label: "Complaints",
            data: Object.values(locationCounts),
            backgroundColor: "#3f51b5",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Function to update the current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('current-time').textContent = timeString;
  }
  setInterval(updateTime, 1000); // Update time every second
  
  // Set a static temperature for now (can integrate API later)
  document.getElementById('temperature').textContent = "25°C"; // Example temperature
  
