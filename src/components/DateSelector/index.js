import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, Button, DateText, DateButton } from './styles';

export default function DateSelector({ enabled, onChange, date }) {
  const formattedDate = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  function subDay() {
    onChange(subDays(date, 1));
  }

  function addDay() {
    onChange(addDays(date, 1));
  }

  async function handleOpenPicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });

    if (action === DatePickerAndroid.dateSetAction) {
      onChange(new Date(year, month, day));
    }
  }

  return (
    <Container>
      <Button disabled={!enabled} onPress={subDay}>
        <Icon size={30} color="#fff" name="chevron-left" />
      </Button>
      <DateButton onPress={handleOpenPicker}>
        <DateText>{formattedDate}</DateText>
      </DateButton>
      <Button disabled={!enabled} onPress={addDay}>
        <Icon size={30} color="#fff" name="chevron-right" />
      </Button>
    </Container>
  );
}
DateSelector.defaultProps = {
  enabled: true,
};

DateSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  enabled: PropTypes.bool,
};
