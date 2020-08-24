function log(i) {
  return Math.log(i) * Math.LOG10E
}

function ln(i) {
  return Math.log(i)
}

function sq(i) {
  return i * i
}

function sqr(i) {
  return Math.sqrt(i)
}

function power(x, y) {
  return Math.pow(x, y)
}

function eTo(x) {
  return Math.exp(x)
}

function fixDP(r, dps) {
  if (isNaN(r)) return 'NaN'
  var msign = ''
  if (r < 0) msign = '-'
  x = Math.abs(r)
  if (x > Math.pow(10, 21)) return msign + x.toString()
  var m = Math.round(x * Math.pow(10, dps)).toString()
  if (dps == 0) return msign + m
  while (m.length <= dps) m = '0' + m
  return (
    msign + m.substring(0, m.length - dps) + '.' + m.substring(m.length - dps)
  )
}

function alertNaN(thisparam) {
  alert(
    thisparam +
      ' is improperly formatted. You may only input the digits 0-9 and a decimal point.'
  )
  doCalc = false
  clrResults()
}

function clrValue(field) {
  field.value = ''
}

var currenttimeout

function resetInTime() {
  if (currenttimeout) clearTimeout(currenttimeout)
  currenttimeout = setTimeout('minMaxCheck();', 3000)
}

var calctxt = ''
var xmltxt = ''
var xmlresult = ''
var htmtxt = ''
var postNow = false
var printing = false
var interptxt = ''
var interphtm = ''
var interpxml = ''

function Framingham08_fx() {
  with (document.Framingham08_form) {
    doCalc = true
    rbchk = false
    if (Sex_radio[0].checked) {
      rbchk = true
    }
    if (Sex_radio[1].checked) {
      rbchk = true
    }
    if (!rbchk) doCalc = false
    param_value = parseFloat(Age_param.value)
    if (isNaN(param_value)) {
      param_value = ''
      doCalc = false
    }
    unit_parts = Age_unit.options[Age_unit.selectedIndex].value.split('|')
    Age = param_value * parseFloat(unit_parts[0]) + parseFloat(unit_parts[1])
    param_value = parseFloat(Sys_BP_param.value)
    if (isNaN(param_value)) {
      param_value = ''
      doCalc = false
    }
    unit_parts = Sys_BP_unit.options[Sys_BP_unit.selectedIndex].value.split('|')
    Sys_BP = param_value * parseFloat(unit_parts[0]) + parseFloat(unit_parts[1])
    param_value = parseFloat(Total_Chol_param.value)
    if (isNaN(param_value)) {
      param_value = ''
      doCalc = false
    }
    unit_parts = Total_Chol_unit.options[
      Total_Chol_unit.selectedIndex
    ].value.split('|')
    Total_Chol =
      param_value * parseFloat(unit_parts[0]) + parseFloat(unit_parts[1])
    param_value = parseFloat(HDL_Chol_param.value)
    if (isNaN(param_value)) {
      param_value = ''
      doCalc = false
    }
    unit_parts = HDL_Chol_unit.options[HDL_Chol_unit.selectedIndex].value.split(
      '|'
    )
    HDL_Chol =
      param_value * parseFloat(unit_parts[0]) + parseFloat(unit_parts[1])
    Sys_BP_Factor = parseFloat(
      Sys_BP_Factor_pulldown.options[Sys_BP_Factor_pulldown.selectedIndex].value
    )
    Cig = parseFloat(Cig_pulldown.options[Cig_pulldown.selectedIndex].value)
    DM = parseFloat(DM_pulldown.options[DM_pulldown.selectedIndex].value)
    dp = decpts.options[decpts.selectedIndex].text
    Risk_Factors =
      ln(Age) * Age_Factor +
      ln(Total_Chol) * Total_Chol_Factor +
      ln(HDL_Chol) * HDL_Chol_Factor +
      ln(Sys_BP) * Sys_BP_Factor +
      Cig +
      DM -
      Avg_Risk

    if (doCalc) Risk_Factors_param.value = fixDP(Risk_Factors, dp)

    Risk = 100 * (1 - power(Risk_Period_Factor, eTo(Risk_Factors)))

    unit_parts = Risk_unit.options[Risk_unit.selectedIndex].value.split('|')
    if (doCalc)
      Risk_param.value = fixDP(
        (Risk - parseFloat(unit_parts[1])) / parseFloat(unit_parts[0]),
        dp
      )
  }
}

function minMaxCheck() {
  if (printing) return

  with (document.Framingham08_form) {
    if (Age_param.value && isNaN(Age_param.value)) {
      clrValue(Age_param)
      alertNaN('Age')
    }
    if (Age_param.value && Age < 30 - 0.00001) {
      Age = 0
      clrValue(Age_param)
      clrResults()
      doCalc = false
      alert(
        'The minimum value for Age is 30 yr.\nIf you are specifying a value with a different unit,\nchange the unit selector first.'
      )
    }
    if (Age_param.value && Age > 74) {
      clrValue(Age_param)
      clrResults()
      Age = 0
      doCalc = false
      alert(
        'The maximum value for Age is 74 yr.\nIf you are specifying a value with a different unit,\nchange the unit selector first.'
      )
    }
    if (Sys_BP_param.value && isNaN(Sys_BP_param.value)) {
      clrValue(Sys_BP_param)
      alertNaN('Sys BP')
    }
    if (Total_Chol_param.value && isNaN(Total_Chol_param.value)) {
      clrValue(Total_Chol_param)
      alertNaN('Total Chol')
    }
    if (HDL_Chol_param.value && isNaN(HDL_Chol_param.value)) {
      clrValue(HDL_Chol_param)
      alertNaN('HDL Chol')
    }
  }
}

function clrResults() {
  with (document.Framingham08_form) {
    Risk_Factors_param.value = ''
    Risk_param.value = ''
  }
}

var Sex = null,
  Age = null,
  Sys_BP = null,
  Total_Chol = null,
  HDL_Chol = null,
  Sys_BP_Factor = null,
  Cig = null,
  DM = null,
  Risk_Factors = null,
  Risk = null,
  param_value = null

function varload1() {
  document.Framingham08_form.Sex_radio[0].checked = true

  Age_Factor = 2.32888

  Total_Chol_Factor = 1.20904

  HDL_Chol_Factor = -0.70833

  Avg_Risk = 26.1931

  Risk_Period_Factor = 0.95012
  with (document.Framingham08_form) {
    Sys_BP_Factor_pulldown.options.length = 0
    Sys_BP_Factor_pulldown.options[
      Sys_BP_Factor_pulldown.options.length
    ] = new Option('No (2.76157)', '2.76157')
    Sys_BP_Factor_pulldown.options[
      Sys_BP_Factor_pulldown.options.length
    ] = new Option('Yes (2.82263)', '2.82263')
  }
  with (document.Framingham08_form) {
    Cig_pulldown.options.length = 0
    Cig_pulldown.options[Cig_pulldown.options.length] = new Option(
      'No (0)',
      '0'
    )
    Cig_pulldown.options[Cig_pulldown.options.length] = new Option(
      'Yes (0.52873)',
      '0.52873'
    )
  }
  with (document.Framingham08_form) {
    DM_pulldown.options.length = 0
    DM_pulldown.options[DM_pulldown.options.length] = new Option('No (0)', '0')
    DM_pulldown.options[DM_pulldown.options.length] = new Option(
      'Yes (0.69154)',
      '0.69154'
    )
  }
}

function varload2() {
  Age_Factor = 3.06117

  Total_Chol_Factor = 1.1237

  HDL_Chol_Factor = -0.93263

  Avg_Risk = 23.9802

  Risk_Period_Factor = 0.88936
  with (document.Framingham08_form) {
    Sys_BP_Factor_pulldown.options.length = 0
    Sys_BP_Factor_pulldown.options[
      Sys_BP_Factor_pulldown.options.length
    ] = new Option('No (1.93303)', '1.93303')
    Sys_BP_Factor_pulldown.options[
      Sys_BP_Factor_pulldown.options.length
    ] = new Option('Yes (1.99881)', '1.99881')
  }
  with (document.Framingham08_form) {
    Cig_pulldown.options.length = 0
    Cig_pulldown.options[Cig_pulldown.options.length] = new Option(
      'No (0)',
      '0'
    )
    Cig_pulldown.options[Cig_pulldown.options.length] = new Option(
      'Yes (0.65451)',
      '0.65451'
    )
  }
  with (document.Framingham08_form) {
    DM_pulldown.options.length = 0
    DM_pulldown.options[DM_pulldown.options.length] = new Option('No (0)', '0')
    DM_pulldown.options[DM_pulldown.options.length] = new Option(
      'Yes (0.57367)',
      '0.57367'
    )
  }
}
