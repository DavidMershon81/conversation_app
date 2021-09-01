#find the set of all of the threshold levels that any users have set
import app.database.user_queries as u_queries

def get_thresholds_set(sigs):
  return set([sig.reveal_threshold for sig in sigs])

#for each of the thresholds, count the number of signatures with that threshold or less
def sigs_below_threshold(threshold, sigs):
  return [s for s in sigs if s.reveal_threshold <= threshold]

#get the highest reveal threshold that has been met by actual signatures
def get_highest_reveal_threshold(sigs):
  result = 0
  thresholds_set = get_thresholds_set(sigs)
  for thresh in thresholds_set:
    sbt = sigs_below_threshold(thresh, sigs)
    reveal = len(sbt) > thresh
    if reveal:
      result = thresh
    else:
      return result
  return result

#get an array of the emails of all signatures that have been revealed
def get_revealed_sig_users(hrt, sigs):
  revealed_sig_ids = [sbt.user_id for sbt in sigs_below_threshold(hrt, sigs)]
  return [user.email for user in u_queries.get_users_with_ids(revealed_sig_ids)]

#get a list of all of the singatures at a threshold
def sigs_at_threshold(threshold, sigs):
  return [s for s in sigs if s.reveal_threshold == threshold]

#get a list of the number of signatures at each unrevealed threshold level
def get_unrevealed_sig_counts(hrt, sigs):
  thresholds_set = get_thresholds_set(sigs)
  unrevealed_thresholds = [t for t in thresholds_set if t > hrt]
  result = []
  for ut in unrevealed_thresholds:
    sat = len(sigs_at_threshold(ut, sigs))
    result.append({'reveal_threshold' : ut, 'signatures' : sat })
  return result

#put everything together and return a dictionary of revealed and unrevealed signatures
#I should be able to just run this through jsonify() to output it at the endpoint
def get_signatures_for_endpoint(sigs):
  hrt = get_highest_reveal_threshold(sigs)
  return { 
      'revealed_signatures' : get_revealed_sig_users(hrt, sigs),
      'unrevealed_signatures' : get_unrevealed_sig_counts(hrt, sigs)
      }