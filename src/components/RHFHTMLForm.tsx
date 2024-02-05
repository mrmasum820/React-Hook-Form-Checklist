// import { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const RHFHTMLForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    // mode: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | 'undefined'
  });

  // destructure from form
  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  // destructure from formState
  const {
    errors,
    isDirty,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  // console.log({touchedFields, dirtyFields, isDirty});
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  // const username = watch("username");
  // const watchForm = watch(["username", "email"]);
  // const watchForm = watch();

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // get field values
  const handleGetValues = () => {
    console.log("Get values", getValues(["username", "channel"]));
  };

  const handleSetValues = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // count how many times the browser rendered
  renderCount++;

  return (
    <div>
      <h1>HTML Form {renderCount / 2}</h1>
      {/* <h2>Watched value: {JSON.stringify(watchForm)}</h2> */}

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Email already exists";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel name is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        {/* nested object field */}
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              // disabled: watch("channel") === "",
              required: "Enter twitter profile",
            })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>
        {/* nested array field */}
        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>
        {/* dynamic fields with add and remove phone numbers */}
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone
            </button>
          </div>
        </div>
        {/* age and date field */}
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="Number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date Of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "DOB is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        {/* submit button */}
        <button disabled={!isDirty || isSubmitSuccessful}>Submit</button>{" "}
        <button onClick={() => reset()}>Reset</button>
        <button onClick={handleGetValues}>get values</button>
        <button onClick={handleSetValues}>set values</button>
        <button onClick={() => trigger("channel")}>Validate</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default RHFHTMLForm;
