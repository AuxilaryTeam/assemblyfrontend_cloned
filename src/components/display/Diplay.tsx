import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card } from "../ui/card";
import { useToast } from "@/hooks/use-toast";

const Display = () => {
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [prevAttendanceCount, setPrevAttendanceCount] = useState(0);

  const [sumVoting, setSumVoting] = useState(0);
  const [prevSumVoting, setPrevSumVoting] = useState(0);

  const [sharesSum, setSharesSum] = useState(0);
  const [prevSharesSum, setPrevSharesSum] = useState(0);

  const [prevPercentage, setPrevPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setPrevPercentage((prevSumVoting / prevSharesSum) * 100 || 0);
  }, [sumVoting, sharesSum]);

  const fetchAttendanceCount = async () => {
    console.log(
      `[${new Date().toLocaleString()}] Starting fetch for attendance count...`
    );
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}admin/countp`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrevAttendanceCount(attendanceCount);
      setAttendanceCount(response.data);
      console.log(
        `[${new Date().toLocaleString()}] Attendance count fetched successfully: ${
          response.data
        }`
      );
      return true;
    } catch (err) {
      console.error(
        `[${new Date().toLocaleString()}] Error fetching attendance count:`,
        err
      );
      toast({
        title: "Data Update Failed",
        description: "Could not fetch attendance count",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchSumSubscription = async () => {
    console.log(
      `[${new Date().toLocaleString()}] Starting fetch for sum subscription...`
    );
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}admin/sumsub`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrevSharesSum(sharesSum);
      setSharesSum(response.data);
      console.log(
        `[${new Date().toLocaleString()}] Sum subscription fetched successfully: ${
          response.data
        }`
      );
      return true;
    } catch (err) {
      console.error(
        `[${new Date().toLocaleString()}] Error fetching sum subscription:`,
        err
      );
      toast({
        title: "Data Update Failed",
        description: "Could not fetch subscription data",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchVotingSum = async () => {
    console.log(
      `[${new Date().toLocaleString()}] Starting fetch for voting sum...`
    );
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}admin/sumvoting`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrevSumVoting(sumVoting);
      setSumVoting(response.data);
      console.log(
        `[${new Date().toLocaleString()}] Voting sum fetched successfully: ${
          response.data
        }`
      );
      return true;
    } catch (err) {
      console.error(
        `[${new Date().toLocaleString()}] Error fetching voting sum:`,
        err
      );
      toast({
        title: "Data Update Failed",
        description: "Could not fetch voting data",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchData = async () => {
    if (!token) {
      console.warn(
        `[${new Date().toLocaleString()}] No authentication token found. Skipping fetch.`
      );
      toast({
        title: "Authentication Error",
        description: "No token found. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    console.log(
      `[${new Date().toLocaleString()}] Starting full data fetch cycle...`
    );
    setIsLoading(true);
    const results = await Promise.allSettled([
      fetchAttendanceCount(),
      fetchSumSubscription(),
      fetchVotingSum(),
    ]);

    const allSuccessful = results.every(
      (result) => result.status === "fulfilled" && result.value === true
    );

    if (allSuccessful) {
      console.log(
        `[${new Date().toLocaleString()}] All data fetched successfully.`
      );
      toast({
        title: "Data Updated",
        description: "All metrics refreshed successfully",
        variant: "default",
      });
    } else {
      console.warn(
        `[${new Date().toLocaleString()}] Some fetches failed during cycle.`
      );
    }
    setIsLoading(false);
    console.log(`[${new Date().toLocaleString()}] Data fetch cycle completed.`);
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 45 seconds
    }, 45000);

    return () => {
      console.log(
        `[${new Date().toLocaleString()}] Cleaning up interval timer.`
      );
      clearInterval(interval);
    };
  }, []);

  const percentage = sharesSum > 0 ? (sumVoting / sharesSum) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <Card className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Shareholder Attendance Dashboard
            </h1>
            <div className="flex items-center">
              {isLoading && (
                <div className="h-3 w-3 rounded-full bg-amber-500 animate-pulse mr-2"></div>
              )}
              <span className="text-sm text-gray-500">
                Auto-updating every 45s
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Count Metric */}
            <div className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-amber-100 opacity-60 rounded-bl-full"></div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                ለስብሰባ የተገኙ የባለአክሲዮኖች ብዛት
              </p>
              <p className="text-4xl font-bold text-gray-900">
                <CountUp
                  start={prevAttendanceCount}
                  end={attendanceCount}
                  duration={1.5}
                  formattingFn={(value) =>
                    Intl.NumberFormat("en-US").format(value)
                  }
                />
              </p>
              <div className="mt-4 h-1 bg-gray-100 rounded-full">
                <div
                  className="h-1 bg-amber-500 rounded-full"
                  style={{
                    width: `${Math.min((attendanceCount / 1000) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Subscribed Shares Metric */}
            <div className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-amber-100 opacity-60 rounded-bl-full"></div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                አጠቃላይ የተፈረመ አክሲዮን ካፒታል (በቁጥር)
              </p>
              <p className="text-4xl font-bold text-gray-900">
                <CountUp
                  start={prevSharesSum}
                  end={sharesSum}
                  duration={1.5}
                  formattingFn={(value) =>
                    Intl.NumberFormat("en-US").format(value)
                  }
                />
              </p>
              <div className="mt-4 h-1 bg-gray-100 rounded-full">
                <div
                  className="h-1 bg-amber-500 rounded-full"
                  style={{
                    width: `${Math.min((sharesSum / 10000000) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Attended Subscribed Shares Metric */}
            <div className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-amber-100 opacity-60 rounded-bl-full"></div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                የተገኙ ባለአክሲዮኖች የተፈረመ አክሲዮን መጠን (በቁጥር)
              </p>
              <p className="text-4xl font-bold text-gray-900">
                <CountUp
                  start={prevSumVoting}
                  end={sumVoting}
                  duration={1.5}
                  formattingFn={(value) =>
                    Intl.NumberFormat("en-US").format(value)
                  }
                />
              </p>
              <div className="mt-4 h-1 bg-gray-100 rounded-full">
                <div
                  className="h-1 bg-amber-500 rounded-full"
                  style={{
                    width: `${Math.min((sumVoting / 10000000) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Percentage Metric */}
            <div className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-amber-100 opacity-60 rounded-bl-full"></div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                የተገኙ ባለአክሲዮኖች የተፈረመ አክሲዮን መጠን (በ%)
              </p>
              <p className="text-4xl font-bold text-gray-900">
                <CountUp
                  start={prevPercentage}
                  end={percentage}
                  duration={1.5}
                  decimals={2}
                  suffix="%"
                />
              </p>
              <div className="mt-4 h-1 bg-gray-100 rounded-full">
                <div
                  className="h-1 bg-amber-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`h-3 w-3 rounded-full ${
                    isLoading ? "bg-amber-500 animate-pulse" : "bg-green-500"
                  } mr-2`}
                ></div>
                <span className="text-sm text-gray-700">
                  {isLoading ? "Updating data..." : "System status: Normal"}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                Last update: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Display;
