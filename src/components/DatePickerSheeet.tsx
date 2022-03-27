import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import BottomSheet from "./BottomSheet";
import React, { useEffect, useMemo, useState } from "react";
import DayPicker, { DayModifiers } from "react-day-picker";
import { ArrowDownIcon, CloseIcon, TriangleDownIcon } from "@chakra-ui/icons";

const DayOfWeek = ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"];

interface Props {
  title: string;
  open: boolean;
  minYear: number;
  handleClose: () => void;
  onChange?: (selected: Date) => void;
  value: Date;
  rightText?: string;
  disabled?: boolean;
}

function Navbar({
  onReceiveDateShow,
  date,
  minYear,
  maxYear,
}: {
  onReceiveDateShow?: (date: Date) => void;
  date: Date;
  minYear: number;
  maxYear: number;
}) {
  const { isOpen, onToggle } = useDisclosure();
  const [dateSelected, setDateSelected] = useState(date);
  const year = dateSelected?.getFullYear();
  useEffect(() => {
    setDateSelected(date);
  }, [date]);

  const validate = (date: Date) => {
    return date.getFullYear() >= minYear && date.getFullYear() <= maxYear;
  };

  const onNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    if (validate(newDate)) {
      setDateSelected(newDate);
      onReceiveDateShow?.(newDate);
    }
  };

  const onPrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    if (validate(newDate)) {
      setDateSelected(newDate);
      onReceiveDateShow?.(newDate);
    }
  };

  const onChangeYear = (value: number) => () => {
    const newDate = new Date(date);
    newDate.setFullYear(value);
    if (validate(newDate)) {
      setDateSelected(newDate);
      onReceiveDateShow?.(newDate);
      onToggle();
    }
  };

  const listYear = useMemo(() => {
    const temp: number[] = [];
    for (let i = minYear; i <= maxYear; i++) {
      temp.push(i);
    }

    return temp;
  }, [maxYear, minYear]);

  return (
    <>
      <Flex mx="1.5rem" justifyContent="space-between" alignItems="center">
        <Flex
          minW="6rem"
          justifyContent="space-between"
          alignItems="center"
          pb="0.2rem"
          borderBottom="1px solid #e2e2e2"
          onClick={onToggle}
          className="button"
        >
          <Text
            textAlign="left"
            fontWeight="bold"
            fontSize="1.2rem"
            lineHeight="1.8rem"
          >
            {dateSelected.getFullYear()}年{dateSelected.getMonth() + 1}月
          </Text>
          <Icon
            as={TriangleDownIcon}
            transform={isOpen ? `rotate(-90deg)` : ""}
            transition="0.4s"
            h="0.8rem"
            w="1rem"
          />
        </Flex>
        {!isOpen && (
          <HStack spacing="2.2rem" mr="-0.2rem">
            <Icon
              as={ArrowDownIcon}
              transform="rotate(90deg)"
              w="1.4rem"
              h="1.5rem"
              className="button"
              onClick={onPrevMonth}
            />
            <Icon
              as={ArrowDownIcon}
              transform="rotate(-90deg)"
              w="1.4rem"
              h="1.5rem"
              className="button"
              onClick={onNextMonth}
            />
          </HStack>
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box w="100%" h="calc(100% - 8rem)" bg="white" position="absolute">
          <Flex px="1rem" flexWrap="wrap" mt="1.6rem">
            {listYear.map((item, index) => {
              return (
                <Flex
                  key={index}
                  w="25%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    w="7.5rem"
                    py="0.3rem"
                    mb="0.9rem"
                    fontWeight="bold"
                    lineHeight="2rem"
                    color={year === item ? "#FF5600" : "secondary"}
                    bg={year === item ? "var(--main-color)" : ""}
                    textAlign="center"
                    borderRadius="2.5rem"
                    _active={{ opacity: 0.7 }}
                    onClick={onChangeYear(item)}
                  >
                    {item}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </Box>
      </Collapse>
      <HStack
        mx="2rem"
        mt="3.1rem"
        pb="0.2rem"
        spacing="2.1rem"
        justifyContent="space-evenly"
        alignItems="center"
        borderBottom="1px solid var(--primary-border-color)"
      >
        {DayOfWeek.map((el) => (
          <Text
            key={el}
            w="3rem"
            h="3rem"
            color="var(--primary-text-color)"
            fontSize="1.2rem"
            lineHeight="1.8rem"
            textAlign="center"
            mx="0"
            fontWeight="bold"
          >
            {el}
          </Text>
        ))}
      </HStack>
    </>
  );
}
const DatePickerSheet = ({
  open,
  handleClose,
  onChange,
  value,
  title,
  minYear,
}: Props) => {
  const [daySelected, setDaySelected] = useState(value ? value : new Date());
  useEffect(() => {
    setDaySelected(value);
  }, [value]);

  const handleSelectDay = (day: Date, modifiers: DayModifiers) => {
    if (!modifiers.selected) {
      setDaySelected(day);
      onChange?.(day);
    }
  };
  // const onSave = () => {
  //   handleClose();
  //   onChange?.(daySelected);
  // };
  const onClose = () => {
    handleClose();
    setDaySelected(value);
  };
  console.log("aasdvalue");
  return (
    <Box w="100%" h="37.5rem">
      <Flex alignItems="center" w="100%" mb="1.4rem">
        <Text ml="1.5rem" fontSize="1.4rem" fontWeight="bold">
          {title}
        </Text>
        <Text
          // onClick={onSave}
          fontSize="1.2rem"
          p="0.4rem 2rem"
          ml="auto"
          mr="3rem"
          mt="0.25rem"
          bg="none"
        >
          {daySelected.getFullYear()}年{daySelected.getMonth() + 1}月
          {daySelected.getDate()}日
        </Text>
        <Button
          colorScheme="red"
          rounded="full"
          onClick={onClose}
          mr="2rem"
          mt="0.25rem"
          w="2.5rem"
          h="2.5rem"
          minW="2.5rem"
          minH="2.5rem"
          aria-label="cancel-btn"
          _focus={{ outline: "none" }}
        >
          <Icon as={CloseIcon} />
        </Button>
      </Flex>
      <Box
        overflow="hidden"
        overflowY="auto"
        boxSizing="border-box"
        pb="4rem"
        css={css`
          div {
            &.DayPicker {
              width: 100%;
              box-sizing: border-box;
              overflow: auto;
            }
            .DayPicker-wrapper {
              width: 100%;
              outline-color: transparent;
            }
            .DayPicker-Body {
              display: flex;
              justify-content: space-evenly;
              flex-wrap: wrap;
              padding-left: 0.5rem;
              padding-right: 0.5rem;
              min-height: 19.1rem;
              margin-top: 0.8rem;
            }
            .DayPicker-Caption {
              display: none;
            }
            .DayPicker-Week {
              width: 100%;
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              .DayPicker-Day:first-of-type {
                color: var(--orange02-text-color);
              }
              .DayPicker-Day:last-of-type {
                color: var(--loss-text-color);
              }
            }
            .DayPicker-Months {
              display: flex;
              flex-direction: column;
              flex-wrap: unset;
              width: 100%;
            }
            .DayPicker-Month {
              font-size: 1.5rem !important;
              box-sizing: border-box;
            }
            .DayPicker-Day {
              padding-left: 0.5rem;
              padding-right: 0.5rem;
              text-align: center;
              vertical-align: middle;
              border-radius: 0;
              border: none;
              outline: none !important;
              cursor: pointer;
              &.DayPicker-Day--outside {
                width: 4rem;
              }
              &.DayPicker-Day--selected {
                border: none;
                &:not(.DayPicker-Day--disabled) {
                  &:not(.DayPicker-Day--outside) {
                    background-color: unset;
                    color: #51a0fa;
                    border: none;
                    .cell-day {
                      background-color: transparent;
                      border: 1px solid #ff5600;
                      color: #ff5600;
                    }
                  }
                }
              }
            }
            .DayPicker-Day--disabled {
              opacity: 0.3;
              visibility: visible;
              cursor: not-allowed;
              z-index: -1;
            }
          }
        `}
      >
        <DayPicker
          selectedDays={daySelected}
          month={daySelected}
          numberOfMonths={1}
          locale="ja"
          // localeUtils={MomentLocaleUtils}
          onDayClick={handleSelectDay}
          disabledDays={[
            {
              after: new Date(),
            },
          ]}
          renderDay={(day) => {
            return (
              <Box
                w="3rem"
                h="3rem"
                margin="0"
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                borderRadius="2.5rem"
                className="cell-day"
              >
                <Text
                  textAlign="center"
                  fontSize="1.4rem"
                  fontWeight="bold"
                  lineHeight="2rem"
                >
                  {day.getDate()}
                </Text>
              </Box>
            );
          }}
          showWeekDays={false}
          navbarElement={
            <Navbar
              minYear={minYear}
              maxYear={new Date().getFullYear()}
              date={daySelected}
              onReceiveDateShow={setDaySelected}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default DatePickerSheet;
