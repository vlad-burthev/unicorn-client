import { FC } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { T_Provider } from "../../interfaces";

//styles
import styles from "./ProviderChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProviderChartProps {
  data: T_Provider[];
}

const ProviderChart: FC<ProviderChartProps> = ({ data }) => {
  const marketShareData = {
    labels: data.map((provider) => provider.name),
    datasets: [
      {
        label: "Market Share",
        data: data.map((provider) => provider.marketShare),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const renewableEnergyData = {
    labels: data.map((provider) => provider.name),
    datasets: [
      {
        label: "Renewable Energy Percentage",
        data: data.map((provider) => provider.renewableEnergyPercentage),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const yearlyRevenueData = {
    labels: data.map((provider) => provider.name),
    datasets: [
      {
        label: "Yearly Revenue",
        data: data.map((provider) => provider.yearlyRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  return (
    <div>
      <h2 className={styles["char-title"]}>Market Share</h2>
      <Bar
        data={marketShareData}
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            title: { display: true, text: "Market Share" },
          },
        }}
      />
      <h2 className={styles["char-title"]}>Renewable Energy Percentage</h2>
      <Bar
        data={renewableEnergyData}
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            title: { display: true, text: "Renewable Energy Percentage" },
          },
        }}
      />
      <h2 className={styles["char-title"]}>Yearly Revenue</h2>
      <Bar
        data={yearlyRevenueData}
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            title: { display: true, text: "Yearly Revenue" },
          },
        }}
      />
    </div>
  );
};

export default ProviderChart;
