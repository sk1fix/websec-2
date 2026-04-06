let charts = {};

function drawCharts(data) {
    if (
        !data ||
        !data.daily ||
        !data.daily.time ||
        !data.daily.temperature_2m_max
    ) {
        console.log("BAD DATA:", data);
        return;
    }

    const labels = data.daily.time;

    const datasets = [
        { id: 'tempChart', label: 'Температура (°C)', data: data.daily.temperature_2m_max, bgColor: 'rgba(255,99,132,0.2)', borderColor: 'rgba(255,99,132,1)' },
        { id: 'precChart', label: 'Осадки (мм)', data: data.daily.precipitation_sum, bgColor: 'rgba(54,162,235,0.2)', borderColor: 'rgba(54,162,235,1)' },
        { id: 'windChart', label: 'Ветер (м/с)', data: data.daily.wind_speed_10m_max, bgColor: 'rgba(255,206,86,0.2)', borderColor: 'rgba(255,206,86,1)' }
    ];

    datasets.forEach(d => {
        const canvas = document.getElementById(d.id);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (charts[d.id]) {
            charts[d.id].destroy();
        }

        charts[d.id] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: d.label,
                    data: d.data,
                    backgroundColor: d.bgColor,
                    borderColor: d.borderColor,
                    fill: true,
                }]
            },
            options: {
                responsive: true,

                interaction: {
                    mode: 'index',     
                    intersect: false   
                },

                hover: {
                    mode: 'nearest',
                    intersect: true
                },

                plugins: {
                    legend: { display: true }
                },

                scales: {
                    y: { beginAtZero: false }
                }
            }
        });
    });
}