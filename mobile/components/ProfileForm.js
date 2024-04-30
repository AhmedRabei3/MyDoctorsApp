import { Formik } from "formik";
import * as yup from "yup";
import styles from "../styles/authStyles";
import { Text, Input, CheckBox, Button } from "react-native-elements";
import MapViewContainer from "./MapViewComponent";

export default function ProfileForm(props) {
  const mode = props.mode;

  // Validation schema for the form
  const validation = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password should be at least  6 characters")
      .required("يجب عليك إدخال كلمة مرور صالحة"),
    userType: yup.boolean(false),
    specialization: yup
      .string()
      .trim(true)
      .when("userType", {
        is: true,
        then: (schema) => schema.required("يجب إدخال التخصص"),
      }),
    workingHours: yup.string().when("userType", {
      is: true,
      then: (schema) => schema.required("يرجى إدخال أوقات الدوام"),
    }),
    adress: yup
      .string()
      .trim(true)
      .when("userType", {
        is: true,
        then: (schema) => schema.required("أدخل العنوان رجاءً"),
      }),
    phone: yup.string().when("userType", {
      is: true,
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, "رقم الهاتف يمكن أن يحتوي على أرقام فقط")
          .required("رقم الهاتف مطلوب"),
    }),
  });
  if (mode == "update") {
    if (props.user[0]) {
      return (
        <Formik
          initialValues={{
            name: props.user[0]?.name,
            email: props.user[0]?.email,
            password: "",
            userType: props.user[0]?.userType == "doctor",
            phone: props.user[0]?.profile?.phone,
            specialization: props.user[0]?.profile?.specialization,
            workingHours: props.user[0]?.profile?.workingHours,
            adress: props.user[0]?.profile?.adress,
            latitude: props.user[0].latitude,
            longitude: props.user[0].longitude,
          }}
          validationSchema={validation}
          onSubmit={(values) => {
            props.submit(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            errors,
            handleSubmit,
            values,
            setFieldValue,
            isValid,
          }) => (
            <>
              <Input
                name="name"
                placeholder="الاسم"
                onBlur={handleBlur("name")}
                onChangeText={handleChange("name")}
                value={values.name}
                style={[styles.textInput, errors.name && styles.errorInput]}
              />
              {errors.name && (
                <Text p style={styles.textError}>
                  {errors.name}
                </Text>
              )}
              <Input
                name="email"
                placeholder="البريد الإلكتروني"
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                disabled={props.disabled}
                value={values.email}
                keyboardType="email-address"
                type="email"
                style={[styles.textInput, errors.email && styles.errorInput]}
              />
              {errors.email && (
                <Text p style={styles.textError}>
                  {errors.email}
                </Text>
              )}
              <Input
                name="password"
                secureTextEntry
                value={values.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                placeholder="كلمة المرور"
                style={[styles.textInput, errors.password && styles.errorInput]}
              />
              {errors.password && (
                <Text p style={styles.textError}>
                  {errors.password}
                </Text>
              )}
              {props.user[0]?.profile?.specialization && (
                <>
                  <Input
                    name="specilaization"
                    value={values.specialization}
                    placeholder="التخصص"
                    onBlur={handleBlur("specialization")}
                    onChangeText={handleChange("specialization")}
                    style={[
                      styles.textInput,
                      errors.specialization && styles.errorInput,
                    ]}
                  />
                  {errors.specialization && (
                    <Text p style={styles.textError}>
                      {errors.specialization}
                    </Text>
                  )}
                  <Input
                    name="workingHours"
                    value={values.workingHours}
                    placeholder="ساعات العمل"
                    onBlur={handleBlur("workingHours")}
                    onChangeText={handleChange("workingHours")}
                    style={[
                      styles.textInput,
                      errors.workingHours && styles.errorInput,
                    ]}
                  />
                  {errors.workingHours && (
                    <Text p style={styles.textError}>
                      {errors.workingHours}
                    </Text>
                  )}
                  <Input
                    name="adress"
                    value={values.adress}
                    placeholder="العنوان"
                    onBlur={handleBlur("adress")}
                    onChangeText={handleChange("adress")}
                    style={[
                      styles.textInput,
                      errors.adress && styles.errorInput,
                    ]}
                  />
                  {errors.adress && (
                    <Text p style={styles.textError}>
                      {errors.adress}
                    </Text>
                  )}
                  <Input
                    name="phone"
                    value={values.phone}
                    placeholder="رقم لهاتف"
                    onblur={handleBlur("phone")}
                    onChangeText={handleChange("phone")}
                    style={[
                      styles.textInput,
                      errors.phone && styles.errorInput,
                    ]}
                  />
                  {errors.phone && (
                    <Text p style={styles.textError}>
                      {errors.phone}
                    </Text>
                  )}
                </>
              )}
              {values.latitude && (
                <MapViewContainer
                  location={{
                    latitude: values.latitude || props.user[0]?.latitude,
                    longitude: values.longitude || props.user[0]?.longitude,
                  }}
                  lat={(value) => {
                    setFieldValue("latitude", value);
                  }}
                  lng={(value) => {
                    setFieldValue("longitude", value);
                  }}
                />
              )}
              <Button
                title={props.Btitle}
                style={{
                  marginTop: "20px",
                  padding: "5px",
                  width: "80%",
                }}
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
      );
    }
  }

  if (mode == "reg") {
    return (
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          userType: "",
          phone: "",
          specialization: "",
          workingHours: "",
          adress: "",
          latitude: null,
          longitude: null,
        }}
        validationSchema={validation}
        onSubmit={(values) => props.submit(values)}
      >
        {({
          handleChange,
          handleBlur,
          errors,
          handleSubmit,
          values,
          setFieldValue,
          isValid,
        }) => (
          <>
            <Input
              name="name"
              placeholder="الاسم"
              onBlur={handleBlur("name")}
              onChangeText={handleChange("name")}
              value={values.name}
              style={[styles.textInput, errors.name && styles.errorInput]}
            />
            {errors.name && (
              <Text p style={styles.textError}>
                {errors.name}
              </Text>
            )}
            <Input
              name="email"
              placeholder="البريد الإلكتروني"
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
              disabled={props.disabled}
              value={values.email}
              keyboardType="email-address"
              type="email"
              style={[styles.textInput, errors.email && styles.errorInput]}
            />
            {errors.email && (
              <Text p style={styles.textError}>
                {errors.email}
              </Text>
            )}
            <Input
              name="password"
              secureTextEntry
              value={values.password}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              placeholder="كلمة المرور"
              style={[styles.textInput, errors.password && styles.errorInput]}
            />
            {errors.password && (
              <Text p style={styles.textError}>
                {errors.password}
              </Text>
            )}

            <CheckBox
              title="أنا طبيب"
              checked={values.userType}
              onPress={() => {
                setFieldValue("userType", !values.userType);
              }}
              name="userType"
            />

            {values.userType && (
              <>
                <Input
                  name="specilaization"
                  value={values.specialization}
                  placeholder="التخصص"
                  onBlur={handleBlur("specialization")}
                  onChangeText={handleChange("specialization")}
                  style={[
                    styles.textInput,
                    errors.specialization && styles.errorInput,
                  ]}
                />
                {errors.specialization && (
                  <Text p style={styles.textError}>
                    {errors.specialization}
                  </Text>
                )}
                <Input
                  name="workingHours"
                  value={values.workingHours}
                  placeholder="ساعات العمل"
                  onBlur={handleBlur("workingHours")}
                  onChangeText={handleChange("workingHours")}
                  style={[
                    styles.textInput,
                    errors.workingHours && styles.errorInput,
                  ]}
                />
                {errors.workingHours && (
                  <Text p style={styles.textError}>
                    {errors.workingHours}
                  </Text>
                )}
                <Input
                  name="adress"
                  value={values.adress}
                  placeholder="العنوان"
                  onBlur={handleBlur("adress")}
                  onChangeText={handleChange("adress")}
                  style={[styles.textInput, errors.adress && styles.errorInput]}
                />
                {errors.adress && (
                  <Text p style={styles.textError}>
                    {errors.adress}
                  </Text>
                )}
                <Input
                  name="phone"
                  value={values.phone}
                  placeholder="رقم الهاتف"
                  onblur={handleBlur("phone")}
                  onChangeText={handleChange("phone")}
                  style={[styles.textInput, errors.phone && styles.errorInput]}
                />
                {errors.phone && (
                  <Text p style={styles.textError}>
                    {errors.phone}
                  </Text>
                )}
                {values.latitude && (
                  <MapViewContainer
                    location={{
                      latitude: values.latitude,
                      longitude: values.longitude,
                    }}
                    lat={(value) => setFieldValue("latitude", value)}
                    lng={(value) => setFieldValue("langitude", value)}
                  />
                )}
              </>
            )}
            <Button
              title={props.Btitle}
              style={{ marginTop: "20px", padding: "5px", width: "85%" }}
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
    );
  }
}
