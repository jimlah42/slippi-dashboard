import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

import { asPercentage } from "../../lib/asPercentage";

export interface WinLossProps {
  Wins: number;
  Losses: number;
}

export const WinLoss: React.FC<WinLossProps> = ({ Wins, Losses }) => {
  const data = [
    { name: "Wins", value: Wins },
    { name: "Losses", value: Losses },
  ];
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Pie data={data} innerRadius="60%" outerRadius="80%" fill="#8884d8" paddingAngle={5} dataKey="value">
          <Label
            value={asPercentage(Wins, Wins + Losses) + "%"}
            position="center"
            className="label"
            offset={50}
            style={{ fill: Wins >= Losses ? "#0255fa" : "#e81010", fontFamily: "Sans-serif" }}
          />
          <Cell key={"cell-0"} fill={"#0255fa"} />
          <Cell key={"cell-1"} fill={"#e81010"} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
