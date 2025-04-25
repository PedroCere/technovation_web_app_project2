if (loading || showLoadingTransition) {
    return <PredictionsLoading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] text-white flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex-1 p-6 md:p-8 overflow-y-auto"
        >
          <motion.div variants={itemVariants}>
            <motion.div variants={itemVariants} className="mt-15 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Emissions Forecast
              </h2>
              <p className="text-sm md:text-base text-emerald-200/80 mt-2">
                AI-powered predictive models for smart emissions management
              </p>
            </motion.div>

            <PredictionForm />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-[#1E1E1E] p-6 rounded-xl shadow-2xl border border-emerald-400/20 mt-10"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-emerald-400">Your Predictions</h3>
              <button
                onClick={fetchPredictions}
                title="Reload Predictions"
                className="text-emerald-400 hover:text-emerald-500 transition text-xl"
                aria-label="Reload Predictions"
              >
                🔃
              </button>
            </div>
            {predictions.length === 0 ? (
              <p className="text-gray-400">No predictions available.</p>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence>
                  {predictions.map((pred) => (
                    <motion.li
                      key={pred.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-[#2D2D2D] p-6 rounded-lg border border-emerald-500/30 shadow-md hover:shadow-emerald-400/50 transition-shadow duration-300 flex justify-between items-start gap-4"
                    >
                      <div>
                        <p className="text-md text-gray-300 font-semibold mb-1">Prediction:</p>
                        <p className="text-sm text-gray-200 mb-2">{pred.prediction}</p>
                        <p className="text-xs text-gray-500 italic">
                          Date: {new Date(pred.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={async () => {
                          try {
                            await deletePrediction(pred.id);
                            setPredictions((prev) => prev.filter((p) => p.id !== pred.id));
                          } catch (err) {
                            alert("Error deleting prediction.");
                          }
                        }}
                        title="Delete"
                        className="text-sm text-rose-400 hover:text-rose-500 transition"
                      >
                        🗑️
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Predictions;
