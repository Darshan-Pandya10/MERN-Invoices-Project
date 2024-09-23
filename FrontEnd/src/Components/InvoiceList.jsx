import React, { useState, useEffect, useRef } from "react";
import { useGetInvoicesQuery } from "../Redux/ApiSlice";
import InvoiceCard from "./InvoiceCard";
import FilterMode from "./FilterMode";
import { CircularProgress, Flex, Box, Text } from "@chakra-ui/react";

const InvoiceList = () => {
  const { data, isError, isLoading, error } = useGetInvoicesQuery();
  console.log(data);
  const [filterData, setFilterData] = useState([]);
  const [filterType, setFilterType] = useState("");
  const count = useRef(0);

  // useEffect(() => {
  //   if (data) {
  //     setFilterData(data);
  //   }
  //   count.current += 1;
  //   console.log(count);
  // }, [data]);

  useEffect(() => {
    if (data) {
      if (filterType === "") {
        setFilterData(data);
      } else {
        setFilterData(data.filter((invoice) => filterType === invoice.status));
      }
    }
  }, [filterType, data]);

  const filterInvoices = (type) => {
    setFilterType(type);
  };

  if (isLoading) {
    return (
      <Flex
        align="center"
        justify="center"
        minH="100%"
        className="invoice-list"
      >
        <CircularProgress
          isIndeterminate
          size="75px"
          thickness="10px"
          color="#8973f9"
        />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        align="center"
        justify="center"
        minH="100%"
        className="invoice-list"
      >
        <h1>
          {error.status} : {error.error}
        </h1>
      </Flex>
    );
  }

  if (!data) {
    return (
      <Flex align="center" justify="center" minH="100vh">
        <Box
          p="6"
          border="2px"
          borderColor="gray.400"
          bg="gray.200"
          rounded="lg"
          color="gray.800"
        >
          <Text as="h1">Create Atleast One Invoice</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100%"
      p="4"
      className="invoice-list"
    >
      <FilterMode filterInvoices={filterInvoices} />
      {filterData.length === 0 ? (
        <Text
          textAlign="center"
          fontWeight="700"
          textTransform="capitalize"
          fontSize="1.5em"
          m="8"
          letterSpacing="wider"
        >
          No invoices found
        </Text>
      ) : (
        filterData.map((invoice) => (
          <InvoiceCard invoice={invoice} key={invoice._id} />
        ))
      )}
    </Flex>
  );
};

export default InvoiceList;
