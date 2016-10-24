declare var require: any;

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('.', true, /\.spec\.ts$/));
