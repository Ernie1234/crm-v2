"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Test() {
  useEffect(() => {
    const res = axios
      .get(`/api/list-transaction`)
      .then((res) => console.log(res));

    console.log(res);
  }, []);
  return <div>Test</div>;
}
