import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const FRUITS = ['apple', 'banana', 'cherry', 'grape', 'orange'] as const;

type Fruit = keyof typeof FRUITS;
type Profile = {
  name: string;
  favoriteFruits: Fruit[];
};

const DEFAULT_VALUES = {
  profiles: [
    {
      name: '',
      favoriteFruits: [],
    },
  ] as Profile[],
};

function Form({
  onClickCopy,
  previousValues,
}: {
  previousValues?: { profiles: Profile[] };
  onClickCopy: (value: { profiles: Profile[] }) => void;
}) {
  const { control, register, getValues, reset } = useForm({
    defaultValues: DEFAULT_VALUES,
  });
  const { fields, append } = useFieldArray({ name: 'profiles', control });

  useEffect(() => {
    if (!previousValues) {
      return;
    }
    reset(previousValues, { keepDefaultValues: true });
  }, [previousValues, reset]);

  return (
    <div className="p-3 border-gray-600 border-4 border-solid">
      <form className="space-y-2">
        {fields.map((field, i) => (
          <div key={field.id}>
            <label>
              name:
              <input
                className="ml-1 border border-gray-400 border-solid px-1"
                {...register(`profiles.${i}.name`)}
              />
            </label>
            <fieldset className="mt-1 border border-gray-400 border-solid p-2">
              <legend>favorite fruits:</legend>
              <div className="flex flex-col">
                {FRUITS.map((fruit) => (
                  <label key={`${i}-${fruit}`}>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value={fruit}
                      {...register(`profiles.${i}.favoriteFruits`)}
                    />
                    {fruit}
                  </label>
                ))}
              </div>
            </fieldset>
            {i === fields.length - 1 && (
              <button
                type="button"
                className="bg-green-500 text-white mt-2 px-4 py-2"
                onClick={() => {
                  append({ name: '', favoriteFruits: [] });
                }}
              >
                add profile
              </button>
            )}
          </div>
        ))}
      </form>
      <div className="flex space-x-2 mt-4">
        <button
          className="bg-orange-500 text-white px-4 py-2"
          type="button"
          onClick={() => onClickCopy(getValues())}
        >
          copy this form
        </button>
        <button
          className="bg-orange-500 text-white px-4 py-2"
          type="button"
          onClick={() => {
            reset();
          }}
        >
          reset this form
        </button>
      </div>
    </div>
  );
}

export function App() {
  const [forms, setForms] = useState([DEFAULT_VALUES]);

  return (
    <div className="p-3 space-y-6">
      {!forms.length && (
        <button
          className="bg-red-500 text-white px-4 py-2 mb-2"
          type="button"
          onClick={() => {
            setForms((prev) => [...prev, DEFAULT_VALUES]);
          }}
        >
          add new form
        </button>
      )}
      {forms.map((form, i) => (
        <Form
          key={i}
          onClickCopy={(v) => {
            setForms((prev) => [...prev, v]);
          }}
          previousValues={form}
        />
      ))}
    </div>
  );
}
