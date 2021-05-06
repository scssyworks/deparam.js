import deparam from '../src/deparam';

test('Deparam should convert simple query string to object', function () {
  expect(deparam('param1=hello&param2=world')).toEqual({
    param1: 'hello',
    param2: 'world',
  });
});

test('Deparam should coerce values if coercion is enabled', function () {
  expect(deparam('param1=10&param2=false')).toEqual({
    param1: '10',
    param2: 'false',
  });
});

test('Deparam should enable coercion of values if second parameter is passed as true', function () {
  expect(deparam('param1=10&param2=false', true)).toEqual({
    param1: 10,
    param2: false,
  });
});

test('Deparam should convert complex query string to object', function () {
  expect(deparam('param1=10&param1=20&param2=helloworld', true)).toEqual({
    param1: [10, 20],
    param2: 'helloworld',
  });
});

test('Prototype should be left alone', function () {
  deparam('test[__proto__][test]=1');
  deparam('test[__proto__]=1&test[__proto__][test]=2');
  deparam('obj[test][]=1&obj[test][]=2&obj[test][__proto__][test]=3');
  expect({}.test).toBe(undefined);
});
