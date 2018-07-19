var element_json = {};
var graph_data = {};
var node_info = {};
var relative_effectiveness_dict = { 'all': {}, 'stress': {}, 'urge': {}, 'ow': {} };
var league_dict = { 'all': {}, 'stress': {}, 'urge': {}, 'ow': {} };
var guide_page_3;
var guide_page_4;

const request = async () => {
  var response = await fetch('./data/studies.json');
  graph_data = await response.json();

  response = await fetch('./data/style.json');
  node_info = await response.json();

  response = await fetch('./data/elements.json');
  elements = await response.json();

  //get relative effectiveness tables
  response = await fetch('./data/tables/relative-cure.html');
  relative_effectiveness_dict['all']['cure'] = await response.text();

  response = await fetch('./data/tables/relative-improvement.html');
  relative_effectiveness_dict['all']['improvement'] = await response.text();

  response = await fetch('./data/tables/relative-satisfaction.html');
  relative_effectiveness_dict['all']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/relative-cure-stress.html');
  relative_effectiveness_dict['stress']['cure'] = await response.text();

  response = await fetch('./data/tables/relative-cure-urge.html');
  relative_effectiveness_dict['urge']['cure'] = await response.text();

  response = await fetch('./data/tables/relative-cure-ow.html');
  relative_effectiveness_dict['ow']['cure'] = await response.text();

  response = await fetch('./data/tables/relative-improvement-stress.html');
  relative_effectiveness_dict['stress']['improvement'] = await response.text();

  response = await fetch('./data/tables/relative-improvement-urge.html');
  relative_effectiveness_dict['urge']['improvement'] = await response.text();

  response = await fetch('./data/tables/relative-improvement-ow.html');
  relative_effectiveness_dict['ow']['improvement'] = await response.text();

  response = await fetch('./data/tables/relative-satisfaction-stress.html');
  relative_effectiveness_dict['all']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/relative-satisfaction-urge.html');
  relative_effectiveness_dict['urge']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/relative-satisfaction-ow.html');
  relative_effectiveness_dict['ow']['satisfaction'] = await response.text();

  //get league tables
  response = await fetch('./data/tables/league-cure.html');
  league_dict['all']['cure'] = await response.text();

  response = await fetch('./data/tables/league-improvement.html');
  league_dict['all']['improvement'] = await response.text();

  response = await fetch('./data/tables/league-satisfaction.html');
  league_dict['all']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/league-cure-stress.html');
  league_dict['stress']['cure'] = await response.text();

  response = await fetch('./data/tables/league-cure-urge.html');
  league_dict['urge']['cure'] = await response.text();

  response = await fetch('./data/tables/league-cure-ow.html');
  league_dict['ow']['cure'] = await response.text();

  response = await fetch('./data/tables/league-improvement-stress.html');
  league_dict['stress']['improvement'] = await response.text();

  response = await fetch('./data/tables/league-improvement-urge.html');
  league_dict['urge']['improvement'] = await response.text();

  response = await fetch('./data/tables/league-improvement-ow.html');
  league_dict['ow']['improvement'] = await response.text();

  response = await fetch('./data/tables/league-satisfaction-stress.html');
  league_dict['all']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/league-satisfaction-urge.html');
  league_dict['urge']['satisfaction'] = await response.text();

  response = await fetch('./data/tables/league-satisfaction-ow.html');
  league_dict['ow']['satisfaction'] = await response.text();

  // tables forguide pages
  response = await fetch('./data/tables/TO1-guide-page-3.html');
  guide_page_3 = await response.text();

  response = await fetch('./data/tables/TO1-guide-page-4.html');
  guide_page_4 = await response.text();

  //KEY POINTS
  kp_all = '<p><strong>Purpose of Review</strong></p><p>Compare nonpharmacological and pharmacological interventions in adult women with urinary incontinence.</p><p><strong>Key Messages</strong></p><ul><li>Available non-pharmacological and pharmacological interventions generally result in better urinary incontinence (UI) outcomes than no treatment.</li><li>In stress UI, among interventions commonly used as first- or second-line therapy, behavioral interventions were more effective than alpha agonists and hormones. For the interventions commonly reserved for third-line therapy, it is unclear whether periurethral bulking agents or intravesical pressure release differ in effectiveness.</li><li>In urgency UI, among interventions commonly used as first- or second-line, therapy, behavioral interventions were more effective than anticholinergics and hormones. For the interventions commonly reserved for third-line therapy, it is unclear whether onabotulinum toxin A or neuromodulation differ in effectiveness.</li><li>Dry mouth is the most common side effect, particularly in anticholinergics, but also in alpha agonists, onabotulinum toxin A, pregabalin, and mirabegron.</li><li>Serious adverse were rare for all interventions. Onabotulinum toxin A was associated with risk of urinary tract infections and urinary retention. Duloxetine was associated with numerous constitutional adverse effects such as nausea, insomnia, and fatigue. What about hormone AES? Periurethral bulking agents were associated with erosion or need for surgical removal in a small percentage of women.</li><li>All of the nonpharmacological interventions, including those that are invasive, generally have few adverse events.</li></ul>'
  kp_adverse_events = '<p>Key Points: Adverse Events</p><p>Nonpharmacological interventions: Full results are given in Tables <a href="#TABLE_19">19</a> and <a href="#TABLE_20">20</a> of the full report.</p><ul><li>First- and second-line interventions: Among interventions for which at least two studies reported any specific adverse event, no (undefined or nonmajor) adverse events were reported with bladder training (2 studies, 106 women), education (4 studies, 277 women), PFMT (21 studies, 1560 women), combined PFMT and biofeedback (3 studies, 83 women), and combined PFMT, TENS, and biofeedback (2 studies, 107 women) (all low SoE).</li><li>Third-line interventions: Among 10 studies of TENS, 8 reported no adverse events in 396 women, but 2 reported &ldquo;any&rdquo; or &ldquo;moderate&rdquo; adverse events (mostly undefined) in a total of 13 of 67 women (19%). Overall, adverse events were reported in 2.8% of 463 women receiving TENS, although the rates of adverse events were lower than with either anticholinergics or with BTX; low strength of evidence.<ul><li>In 2 studies of magnetic stimulation, 3 of 110 women total (2.7%) had undefined adverse events.</li></ul></li></ul><p>Pharmacological interventions: Full results are given in Tables <a href="#TABLE_24">24</a> and <a href="#TABLE_25">25</a> of the full report</p><ul><li>Serious adverse events (as defined by study authors)<ul><li>Second-line interventions<ul><li>In 8 studies of anticholinergics, overall 2.4% of 2583 women had &ldquo;serious&rdquo; adverse events (undefined); low strength of evidence.</li><li>In 2 studies, 0.6% of 1390 women taking the alpha agonist duloxetine had (undefined) serious adverse events, compared with 0.2% of 2852 women taking placebo (or no treatment) in 10 studies.</li></ul></li><li>Third-line interventions<ul><li>The highest rate of serious adverse events occurred with periurethral bulking agents (4.7%, 3 studies, 362 women); these adverse events included erosion and need for surgical excision of the bulking agents. The one study of a periurethral bulking agent currently available in the United States (macroplastique) reported 1.6% rate of erosion. Low strength of evidence.</li></ul></li><li>Dry mouth<ul><li>Second-line interventions<ul><li>Anticholinergics: 21 studies reported adverse events for anticholinergics. Dry mouth was the most commonly reported adverse event (median 36%); high strength of evidence.</li><li>Alpha agonists: 15 studies of the alpha agonist duloxetine reported dry mouth in a median of 13% of women. High strength of evidence.</li></ul></li><li>Second- and third-line interventions<ul><li>Other pharmacological interventions: Dry mouth was reported between 0.7% and 31% of women with other drugs, including BTX (31%), pregabalin (11%), and mirabegron (0.7%). High strength of evidence overall</li></ul></li><li>Placebo: In 35 studies, a median of 4% of women had dry mouth with placebo treatment; high strength of evidence. In addition, for comparison, in one study 35% of women receiving nonpharmacological intervention bladder training complained of dry mouth</li></ul></li><li>Other adverse events<ul><li>Second-line interventions<ul><li>Alpha agonists: Other reported adverse events included nausea (23%, 15 studies), insomnia (13%, 13 studies), constipation (11%, 14 studies), fatigue (10%, 13 studies), dizziness (11%, 14 studies), and headache (8.3%, 11 studies). Moderate strength of evidence overall.</li></ul></li><li>Third-line interventions<ul><li>BTX: the most commonly reported adverse event in 6 studies was urinary tract infection in a median of 35% of women across studies (range 4% to 55%, 2304 participants). Three studies reported urinary retention or voiding dysfunction in a median of 18% of women (range 1.3% to 28%). Moderate strength of evidence overall.</li><li>Periurethral bulking agents: the most common adverse events were urinary tract infection (median 6.6%; range 1.3% to 24% with different specific agents) and urinary retention/voiding dysfunction (median 3.8%; range 0.9% to 9.5%). The one study (122 women) that evaluated a periurethral bulking agent currently available in the United States (macroplastique) found high rates of urinary tract infection (24%), headache (18%), and urinary retention/dysuria (16%). Low strength of evidence overall.</li></ul></li></ul></li></ul></li></ul><p>&nbsp;</p>';
  kp_cure_stress = '<p><strong>Key Points: Cure of Stress UI</strong></p><ul><li>Overall, 51 studies reported on cure; 29 of these studies were specifically among women who have only stress UI.</li><li><strong>First- and second-line interventions</strong> (behavioral therapy, alpha agonists, and hormones)<ul><li>29 studies that evaluated first- and second-line interventions used for stress UI reported on cure; 12 of these were studies specifically of women with stress UI.</li><li>Across all studies (including studies of any UI type), behavioral therapy (alone) and combination behavioral therapy and hormones were found to be statistically significantly more effective than no treatment (OR 3.1, 95% CI 2.2 to 4.4 for behavioral therapy; OR 4.4, 95% CI 1.4 to 13.8 for combination treatment), based on analyses across all studies. Studies found alpha agonists to have no significant difference in cure rates than placebo (OR 1.2, 95% CI 0.6 to 2.5). Studies of only women with stress UI had similar, but less precise, findings than analyses of all studies regardless of UI type. Moderate strength of evidence overall.</li><li>Behavioral therapy (alone) and combination behavioral therapy and hormones were more effective in achieving cure than alpha agonists alone (OR 2.5, 95% CI 1.2 to 5.3 for behavioral therapy; 3.6, 95% CI 0.98 to 14.3 for combination) in studies of women with stress UI (and stronger effects seen in studies of only woment with stress UI). Moderate strength of evidence.</li><li>All other comparisons among first- and second-line interventions were statistically nonsignificant with wide confidence intervals.</li></ul></li><li><strong>Third-line interventions</strong> (periurethral bulking agents, intravesical pressure release, and neuromodulation which is typically used for urgency UI)<ul><li>22 studies that evaluated third-line interventions used for stress UI reported on cure; 13 of these were studies specifically of women with stress UI.</li><li>Neither periurethral bulking agents nor intravesical pressure release have been shown to be more effective than sham or no treatment across studies.</li><li>In studies of women with stress UI, neuromodulation (which is typically used for urgency UI) has been found to be significantly more effective than sham or no treatment (OR 3.5, 95% CI 1.7 to 7.3); low strength of evidence.</li><li>No study directly compared the third-line interventions. The indirect comparison (from the network meta-analysis) provided insufficient evidence to draw any conclusions, giving only an imprecise estimate of the comparative effectiveness of periurethral bulking agents and intravesical pressure release and a wide confidence interval.</li></ul></li></ul>';
  kp_cure_urgency = '<p><strong>Key Points: Cure of Urgency UI</strong></p><ul><li>Overall, 51 studies reported on cure; 10 of these studies were specifically among women who have only urgency UI.</li><li><strong>First- and second-line interventions</strong>&nbsp;(behavioral therapy, anticholinergics, and combination anticholinergic and behavioral therapy)<ul><li>33 studies that evaluated first- and second-line interventions used for urgency UI reported on cure; 9 of these were studies specifically of women with urgency UI.</li><li>Across all studies (including studies of any UI type), behavioral therapy, anticholinergics, and combination anticholinergic and behavioral therapy, have been found to be more effective than placebo or no treatment (OR 3.1, 95% CI 2.2 to 4.4 for behavioral therapy; OR 2.0, 95% CI 1.3 to 2.9 for anticholinergics; and OR 2.4, 95% CI 0.8 to 7.0 for combination). Studies of only women with urgency UI had similar findings as the analyses of all studies; although combination therapy was found to be statistically significantly more effective than no treatment among these studies (OR 2.3, 95% CI 1.2 to 2.4 for combination). Moderate strength of evidence overall.</li><li>Behavioral therapy was found to be significantly more likely to achieve cure than anticholinergics (OR 2.8, 95% CI 1.6 to 4.6) in studies of women with urgency UI. The comparison was also statistically significant across all studies. Moderate strength of evidence.</li><li>Other comparisons were statistically nonsignificant with wide confidence intervals.</li></ul></li><li><strong>Third-line interventions</strong>&nbsp;(BTX, neuromodulation, and combinations of neuromodulation with first- or second-line interventions)<ul><li>21 studies that evaluated third-line interventions used for urgency UI reported on cure; 6 of these were studies specifically of women with urgency UI.</li><li>Across all studies (including studies of any UI type), onabotulinum toxin A (BTX), neuromodulation, combination neuromodulation and behavioral therapy, and triple combination of neuromodulation, hormones and behavioral therapy were all found to be more effective than sham, placebo, or no therapy with ORs ranging from 4.2 to 7.4 across all studies. In studies only of women with urgency UI, BTX and neuromodulation have been evaluated with similar findings. Moderate strength of evidence overall.</li><li>No therapy was found to be statistically significantly more effective than others, but BTX may be favored over neuromodulation (OR 1.69, 95% CI 0.80 to 3.62), with moderate strength of evidence</li></ul></li></ul>';
  kp_improvement_stress = '<p><strong>Key Points: Improvement of Stress UI</strong></p><ul><li>Overall, 64 studies reported on improvement; 25 of these studies were specifically among women who have only stress UI.</li><li><strong>First- and second-line interventions</strong> (behavioral therapy, alpha agonists, and hormones)<ul><li>36 studies that evaluated first- and second-line interventions used for stress UI reported on improvement; 15 of these were studies specifically of women with stress UI.</li><li>Behavioral therapy and alpha agonists have been found to be significantly more effective to achieve improvement than no treatment in studies of women with stress UI-25 studies NWMA (OR 7.0, 95% CI 3.2 to 15.6 for behavioral therapy; OR 2.3, 95% CI 1.6 to 3.3 for alpha agonists). Hormones have not been found to be significantly different than placebo (OR 0.5, 95% CI 0.1 to 2.0). Similar results were found across all 64 studies. Moderate strength of evidence overall.</li><li>Behavioral therapy was found to be statistically significantly more effective in achieving improvement than alpha agonists (OR 3.1, 95% CI 1.3 to 7.3) and hormones (OR 13.8, 95% CI 3.0 to 63.5) in studies including only women with stress UI (25). Smaller, but more precise, estimates were found across all 64 studies. Moderate strength of evidence.</li><li>Behavioral therapy was also found to possibly be more effective than combination hormones and anticholinergics (which are typically used for urgency UI; OR 5.28, 95% CI 0.86 to 32.5) across studies, with a similar estimate across studies of women with stress UI. Moderate strength of evidence.</li><li>Alpha agonists were also found to be significantly more effective than hormones in both studies that included only women with stress UI and across all studies (OR 4.5, 95% CI 1.1 to 17.8 in stress UI studies). Moderate strength of evidence.</li></ul></li><li><strong>Third-line interventions</strong> (periurethral bulking agents and intravesical pressure release)<ul><li>25 studies that evaluated third-line interventions used for stress UI reported on improvement; 13 of these were studies specifically of women with stress UI.</li><li>Compared with sham or no treatment, intravesical pressure release was found to be more effective for improvement (OR 4.4, 95% CI 1.4 to 13.4 in stress UI studies, with similar findings across all studies). No significant difference has been found between periurethral bulking agents and no treatment. Moderate strength of evidence.</li><li>The two third-line interventions have not been directly compared and indirect comparisons are imprecise. Insufficient evidence.</li></ul></li></ul>';
  kp_improvement_urgency = '<p><strong>Key Points: Improvement of Urgency UI</strong></p><ul><li>Overall, 64 studies reported on improvement; 18 of these studies were specifically among women who have only urgency UI.</li><li><strong>First- and second-line interventions</strong> (behavioral therapy, anticholinergics, and combination anticholinergic and behavioral therapy)<ul><li>29 studies that evaluated first- and second-line interventions used for urgency UI reported on improvement; 10 of these were studies specifically of women with urgency UI.</li><li>All first- or second-line interventions were found to be more effective than no treatment in studies of women with urgency UI reported in 18 studies (OR 3.6, 95% CI 1.8 to 7.3 for behavioral therapy; OR 1.8, 95% CI 1.2 to 2.7 for anticholinergics, and OR 3.9, 95% CI 1.9 to 7.8 for combination anticholinergic and behavioral therapy. Larger and more precise estimates were found in analyses across all 64 studies. Moderate strength of evidence overall.</li><li>Behavioral therapy was found to be significantly more likely to achieve improvement than anticholinergics (OR 4.2, 95% CI 1.6 to 10.9) in 18 urgency UI studies, with similar but smaller estimates found across all studies. Moderate strength of evidence.</li><li>Behavioral therapy and hormones have not been directly compared, but indirect comparison found that behavioral therapy was significantly more effective than hormones (OR 10, 95% CI 3.57 to 33.3). Moderate strength of evidence.</li><li>Across all studies, compared to hormones, combination anticholinergics and behavioral therapy (OR 10.03, 95% CI 2.21 to 45.43) or anticholinergics alone (OR 5.58, 95% CI 1.91 to 16.3). Moderate strength of evidence.</li></ul></li><li><strong>Third-line interventions</strong> (BTX, neuromodulation, and combinations of neuromodulation with first- or second-line interventions)<ul><li>23 studies that evaluated third-line interventions used for urgency UI reported on improvement; 3 of these were studies specifically of women with urgency UI.</li><li>Indirect evidence from urgency UI studies found that BTX (OR 3.6, 95% CI 1.8 to 7.3) and neuromodulation (OR 4.4, 95% CI 2.0 to 9.6) were more effective than no treatment in 18 urgency UI studies. Across all studies, similar, but more precise, estimates were found. In addition, indirect evidence found that combination neuromodulation and behavioral therapy was more effective than no treatment (OR 6.7, 95% CI 2.7 to 16.7). Moderate strength of evidence overall.</li><li>No intervention was found to be statistically significantly more effective than others, but no study directly compared BTX with the various neuromodulation therapies.</li></ul></li></ul>';
  kp_satisfaction_all = '<p><strong>Key Point: Satisfaction in All Studies</strong></p><ul><li>Overall, 12 studies reported on satisfaction.</li><li>Across intervention categories in which satisfaction was evaluated, active interventions resulted in higher rates of satisfaction than no treatment; moderate strength of evidence.</li></ul>';
  kp_satisfaction_w_stress = '<p><strong>Key Points: Satisfaction in Women with Stress UI</strong></p><ul><li>Across 4 studies, 1 of which was specifically in women with stress UI, there were no comparisons of satisfaction outcomes for first- or second-line interventions.</li><li>Across 6 studies, 4 of which were specifically in women with stress UI, there were no comparisons of satisfaction outcomes for third-line interventions.</li><li>However, there were direct comparisons between first- and third-line treatments. Comparisons of behavioral therapy and neuromodulation and among stress UI studies (and across all 12 studies) found no significant difference between the two interventions. moderate strength of evidence.&nbsp;</li></ul>';
  kp_satisfaction_w_urgency = '<p><strong>Key Points: Satisfaction in Women with Urgency UI</strong></p><ul><li><strong>First-and second-line interventions</strong> (behavioral therapy, anticholinergics, and combination anticholinergic and behavioral therapy)<ul><li>8 studies that evaluated first- or second-line interventions used for urgency UI reported on satisfaction; 3 of these were studies specifically of women with urgency UI.</li><li>Behavioral therapy was found to be significantly more likely to achieve satisfaction than anticholinergics (OR 8.2, 95% CI 1.7 to 39.4) among studies of women with urgency UI, with a smaller but more precise estimate found from the analysis of all 12 studies; moderate strength of evidence.</li></ul></li><li><strong>Third-line interventions</strong> (BTX, neuromodulation, and combinations of neuromodulation with first- or second-line interventions)<ul><li>6 studies that evaluated third-line interventions used for urgency UI reported on satisfaction; 1 of these were studies specifically of women with urgency UI.</li><li>Studies of women with only urgency UI did not report on satisfaction with third-line interventions. Across all 12 studies, no third-line intervention was found to provide statistically significantly more satisfactory control of UI symptoms than other interventions. Insufficient strength of evidence.</li></ul></li></ul>';
  kp_QoL = '<p><strong>Key Points: Quality of Life</strong></p><ul><li>Nonpharmacological vs. sham interventions (KQ 1): 36 studies compared 15 nonpharmacological interventions with sham interventions.<ul><li>Among first- and second-line interventions, none was found by <em>all</em> studies to be statistically significantly better than sham for any aspect of quality of life, but each was reported to have statistically significant improvements compared to placebo in at least one aspect of quality of life by at least one study; low strength of evidence.</li><li>Among the third-line interventions evaluated by more than one study, only transcutaneous electrical nerve stimulation (TENS) was found by all studies to be statistically significantly better than sham for various aspects of quality of life; low strength of evidence.</li><li>A combination of first- and third line interventions, TENS + PFMT (pelvic floor muscle training), had discordant results when compared to a sham intervention; but one study showed a statistically significant improvement in daily activities; low strength of evidence.</li></ul></li><li>Comparison of nonpharmacological interventions (KQ 1) with each other: 42 studies compared 19 active nonpharmacological interventions (including combinations of nonpharmacological interventions) with each other. The full results are given in Table <a href="#TABLE_17">17</a> and <a href="#TABLE_18">18</a> of the main report.<ul><li>The only comparisons of interventions evaluated by more than one study were of supervised and unsupervised PFMT (or other exercise) and of combined PFMT and biofeedback and PFMT alone. These studies mostly found discordant results or no significant differences in quality of life; insufficient strength of evidence.</li></ul></li><li>Pharmacological interventions vs. placebo (KQ 2): 16 studies compared 8 specific pharmacological interventions with placebo. The full results are given in Tables <a href="#TABLE_22">22</a> and <a href="#TABLE_23">23</a> of the main report.<ul><li>In 6 studies, anticholinergics were found to improve quality of life compared with no treatment; low strength of evidence.</li></ul></li><li>Comparison of pharmacological interventions (KQ 2): 6 studies compared 8 pharmacological interventions with each other. In most instances, no differences in quality of life were reported among interventions; low strength of evidence.</li><li>Nonpharmacological vs. pharmacological interventions (KQ 3): Sparse evidence from 4 studies suggest no significant differences in quality of life for behavioral therapy vs. anticholinergics, neuromodulation vs. anticholinergics, and neuromodulation vs. BTX; low strength of evidence. The full results are given in <a href="#TABLE_26">Table 26</a> of the main report.</li><li>Combination nonpharmacological and pharmacological interventions vs. nonpharmacological interventions (KQ 4): 1 study compared combination nonpharmacological and pharmacological interventions (PFMT, electrostimulation, biofeedback, and vaginal estrogen) and nonpharmacological interventions (without the estrogen). The arm that received estrogen reported statistically significantly better quality of life; low strength of evidence.</li></ul>';
  var cy = cytoscape({
    container: document.getElementById('cy'), // container to render in
  });

  //state variables
  var prev_node = null;
  var node = null;
  var ow = [ '0', '1' ];
  var type = 'all';
  var outcome = [ 'cure', 'improvement', 'satisfaction', 'QoL' ];

  const update_kps = () => {
    // hide everything except empty modal
    // add all the right kp html elements to the  modal content

    kp_content = "";

    jQuery.each(outcome, function() {
      switch (this.toString())  {
        case 'cure':
          switch (type) {
            case 'stress-ui':
              kp_content += kp_cure_stress;
              kp_content += '<br>';
              break;
            case 'urge-ui':
              kp_content += kp_cure_urgency;
              kp_content += '<br>';
              break;
            default:
              kp_content += kp_cure_stress;
              kp_content += '<br>';
              kp_content += kp_cure_urgency;
              kp_content += '<br>';
              break;
          }
          break;
        case 'improvement':
          switch (type) {
            case 'stress-ui':
              kp_content += kp_improvement_stress;
              kp_content += '<br>';
              break;
            case 'urge-ui':
              kp_content += kp_improvement_urgency;
              kp_content += '<br>';
              break;
            default:
              kp_content += kp_improvement_stress;
              kp_content += '<br>';
              kp_content += kp_improvement_urgency;
              kp_content += '<br>';
              break;
          }
        case 'satisfaction':
          /// ASK THIS - should we display all of them
          kp_content += kp_satisfaction_all;
          kp_content += '<br>';
          kp_content += kp_satisfaction_w_stress;
          kp_content += '<br>';
          kp_content += kp_satisfaction_w_urgency;
          kp_content += '<br>';
        case 'QoL':
          kp_content += kp_QoL;
          kp_content += '<br>';
          break;
        default:
          console.log('loyloy');
          break;
      }
    });

    return kp_content;
  }

  //update cy elements from the elements dictionary
  const update_nodes = () => {
    var new_nodes = [];
    var new_edges = [];
    jQuery.each(outcome, function() {
      var o = this;
      jQuery.each(ow, function() {
        var w = this;
        new_nodes = new_nodes.concat(elements[type][w][o]['nodes']);
        new_edges = new_edges.concat(elements[type][w][o]['edges']);
      });
    });
    cy.json( { elements: { nodes: new_nodes, edges: new_edges } } );
  }
  cy.json(node_info);
  update_nodes();

  //returns the studies for 2 nodes
  const get_studies_2 = ( node1, node2 ) => {
    a_dict = { "stress": ["sui"], "urge": ["uui"], "all": ["sui","uui","0"] }
    node1_id = node1.id();
    node2_id = node2.id();
    var study_list = [];
    jQuery.each(graph_data, function() {
      if ((this['coarse_trt_code1'] == node1_id &&
        this['coarse_trt_code2'] == node2_id) ||
        (this['coarse_trt_code1'] == node2_id &&
        this['coarse_trt_code2'] == node1_id) &&
        ( a_dict[type].indexOf(this['ui_type'].toString()) >= 0 ) &&
        ( ow.indexOf(this['older_women'].toString()) >= 0 ) &&
        ( outcome.indexOf(this['outcome'].toString()) >= 0 )) {
          study_list.push(this);
      }
    });
    return study_list;
  }

  //returns the studies for a single node
  const get_studies_1 = ( node ) => {
    a_dict = { "stress": ["sui"], "urge": ["uui"], "all": ["sui","uui","0"] }
    node_id = node.id();
    var study_list = [];
    jQuery.each(graph_data, function() {
      if (( this['coarse_trt_code1'] == node_id ||
        this['coarse_trt_code2'] == node_id ) &&
        ( a_dict[type].indexOf(this['ui_type'].toString()) >= 0 ) &&
        ( ow.indexOf(this['older_women'].toString()) >= 0 ) &&
        ( outcome.indexOf(this['outcome'].toString()) >= 0 )) {
          study_list.push(this);
      }    });
    return study_list;
  }

  //returns the studies for the whole graph
  const get_studies_0 = () => {
    a_dict = { "stress": ["sui"], "urge": ["uui"], "all": ["sui","uui","0"] }
    var study_list = [];
    jQuery.each(graph_data, function() {
      if (( a_dict[type].indexOf(this['ui_type'].toString()) >= 0 ) &&
        ( ow.indexOf(this['older_women'].toString()) >= 0 ) &&
        ( outcome.indexOf(this['outcome'].toString()) >= 0 )) {
          study_list.push(this);
      }else{
        console.log(this);
      }
    });
    console.log(graph_data.length, study_list.length);
    return study_list;
  }

  //get guide working
  const guide_1 = () => {
    window.location.hash = '#guide';
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#guide-page-1').show();
    $('#guide-page-2').hide();
    $('#guide-page-3').hide();
    $('#guide-page-4').hide();
    $('#guide-modal').show();
  }

  const guide_2 = () => {
    $('#guide-page-1').hide();
    $('#guide-page-2').show();
  }

  const guide_3 = () => {
    $('#guide-page-2').hide();
    $('#guide-page-3-table').html(guide_page_3);
    $('#guide-page-3').show();
  }

  const guide_4 = () => {
    $('#guide-page-3').hide();
    $('#guide-page-4-table').html(guide_page_4);
    $('#guide-page-4').show();
  }

  $('#guide-button-1').on('click', function() {
    guide_2();
  });

  $('#guide-button-2').on('click', function() {
    guide_3();
  });

  $('#guide-button-3').on('click', function() {
    guide_4();
  });

  $('#close-guide, #guide-button-4').on('click', function() {
    window.location.hash = '#index';
    $('#guide-modal').hide();
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
  });

  //when a node is clicked on, update the current and previous nodes
  cy.on('tap', 'node', function(e) {
    if ( e.target == prev_node ) {
      prev_node.removeClass('highlight');
      prev_node = null;
      return;
    }

    if ( e.target == node ) {
      node.removeClass('highlight');
      node = prev_node;
      prev_node = null;
      return;
    }

    if ( prev_node !== null ) {
      prev_node.removeClass('highlight');
    }

    prev_node = node;
    node = e.target;

    if ( node !== null ) {
      node.addClass('highlight');
    }
  });


  //update the cy elements array when filtering settings are changed
  $('#type-form input').on('change', function() {
    if (prev_node != null) {
      prev_node.removeClass('highlight');
    }
    if (node != null) {
      node.removeClass('highlight');
    }

    node = null;
    prev_node = null;

    switch($('input[name=type-radio]:checked', '#type-form').val()) {
      case 'stress-ui':
        type = 'stress';
        break;

      case 'urge-ui':
        type = 'urge';
        break;

      default:
        type = 'all';
    }
    update_nodes();
  });

  //update the cy elements array when filtering settings are changed
  $('#ow-form input').on('change', function() {
    if (prev_node != null) {
      prev_node.removeClass('highlight');
    }
    if (node != null) {
      node.removeClass('highlight');
    }

    node = null;
    prev_node = null;

    switch($('input[name=ow-radio]:checked', '#ow-form').val()) {
      case 'older-women':
        ow = ['1'];
        break;
      default:
        ow = ['0', '1'];
    }
    update_nodes();
  });

  const handleOutcome = ( value ) => {
    console.log(value);
  }

  $('input[name="outcome-checkbox"]').change(
    function(){
      if (prev_node != null) {
        prev_node.removeClass('highlight');
      }
      if (node != null) {
        node.removeClass('highlight');
      }

      node = null;
      prev_node = null;

      if ($(this).is(':checked')) {
        outcome.push($(this).val());
      } else {
        outcome.splice(outcome.indexOf($(this).val()),1);
      }
      update_nodes();
    });

  //disable buttons for filters without corresponding tables
  $('input[name=outcome-checkbox], input[name=type-radio], input[name=ow-radio]').change(
    function(){
      if (!( ow.length == 1 && type != 'all' ) && (outcome.length == 1)){
        $('#league-button').attr('disabled', false);
        $('#relative-button').attr('disabled', false);
      } else {
        $('#league-button').attr('disabled', true);
        $('#relative-button').attr('disabled', true);
      }
  });

  //button that pulls the studies for nodes
  $('#get-studies-button').on('click', function() {
    window.location.hash = '#studies';
    var study_list;
    if (node == null) {
      study_list = get_studies_0();
    } else if (prev_node == null) {
      study_list = get_studies_1(node);
    } else {
      study_list = get_studies_2(prev_node, node);
    }

    $('#studies-modal-content').empty();
    content = "<table id='studies-table' class='display nowrap'>";
    content += "<thead><tr align='left'>";
    content += "<th> PMID </th>";
    content += "<th> Study Author </th>";
    content += "<th> Year </th>";
    content += "<th> Age </th>";
    content += "<th> Older_women </th>";
    content += "<th> UI type </th>";
    content += "<th> Followup </th>";
    content += "<th> Counts </th>";
    content += "<th> Coarse trt </th>";
    content += "<th> Granular trt </th>";
    content += "<th> trt description1 </th>";
    content += "<th> trt description2 </th>";
    content += "<th> OR </th>";
    content += "<th> Outcome </th>";
    content += "<th> Combined </th>";
    content += "<th> Blinding of Patients </th>";
    content += "<th> Blinding of Assessors </th>";
    content += "<th> Intention to Treat </th>";
    content += "<th> Attrition Bias </th>";
    content += "<th> Selection Bias </th>";
    content += "<th> Intervention Described </th>";
    content += "<th> Intervention Compliance </th>";
    content += "<th> Other Issues </th>";
    content += "<th> Allocation Concealment </th>";
    content += "</tr></thead>";
    content += "<tbody>"
    jQuery.each(study_list, function() {
      content += '<tr>';
      content += '<td>' + this['pmid'] + '</td>';
      content += '<td>' + this['study_author'] + '</td>';
      content += '<td>' + this['year'] + '</td>';
      content += '<td>' + this['age'] + '</td>';
      content += '<td>' + this['older_women'] + '</td>';
      content += '<td>' + this['ui_type'] + '</td>';
      content += '<td>' + this['followup'] + '</td>';
      content += '<td>' + this['counts_string'] + '</td>';
      content += '<td>' + this['coarse_comparison_string'] + '</td>';
      content += '<td>' + this['granular_comparison_string'] + '</td>';
      content += '<td>' + this['trt_description1'] + '</td>';
      content += '<td>' + this['trt_description2'] + '</td>';
      content += '<td>' + this['or_string'] + '</td>';
      content += '<td>' + this['outcome'] + '</td>';
      content += '<td>' + this['combined'] + '</td>';
      content += '<td>' + this['randomization_sequence'] + '</td>';
      content += '<td>' + this['blinding_of_assessors'] + '</td>';
      content += '<td>' + this['intention_to_treat'] + '</td>';
      content += '<td>' + this['attrition_bias'] + '</td>';
      content += '<td>' + this['selection_bias'] + '</td>';
      content += '<td>' + this['interventions_described'] + '</td>';
      content += '<td>' + this['intervention_compliance'] + '</td>';
      content += '<td>' + this['other_issues'] + '</td>';
      content += '<td>' + this['allocation_concealment'] + '</td>';
      content += '</tr>';
    });
    content += '</tbody>';
    content += '</table>';
    $('#studies-modal-content').html(content);
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#studies-modal').show();
    $('#studies-table').DataTable({
        autoWidth: true,
        pageLength: 15,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [ 'colvis' ]
      });
  });

  // button events
  $('#close-studies-modal').on('click', function() {
    window.location.hash = '#index';
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#studies-modal').hide();
  });
  $('#key-messages-button').on('click', function() {
    window.location.hash = '#key-messages';
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#key-messages-content').empty();
    $('#key-messages-content').html(kp_all);
    $('#key-messages').show();
  });
  $('#close-key-messages').on('click', function() {
    window.location.hash = '#index';
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#key-messages').hide();
  });
  $('#summary-button').on('click', function() {
    window.location.hash = '#key-messages';
    kp_content = update_kps();

    $('#key-messages-content').empty();
    $('#key-messages-content').html(kp_content);

    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#key-messages').show();
  });



  $('#overview-button').on('click', function() {
    window.location.hash = '#overview';
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#overview-dummy').show();
  });
  $('#close-overview').on('click', function() {
    window.location.hash = '#index';
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#overview-dummy').hide();
  });
  $('#close-table').on('click', function() {
    window.location.hash = '#index';
    $('#cy').show();
    $('#navbar').show();
    $('#sidebar').show();
    $('#legend').show();
    $('#table-div').hide();
  });
  $('#league-button').on('click', function() {
    window.location.hash = '#table';
    $('#table-content').html(league_dict[type][outcome[0]]);
    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#table-div').show();
  });

  $('#relative-button').on('click', function() {
    window.location.hash = '#table';
    if ( ow == ['1'] && type == 'all' && outcome == ['all'] ){
      $('#table-content').html(relative_effectiveness_dict['ow']['all']);
    } else {
      $('#table-content').html(relative_effectiveness_dict[type][outcome[0]]);
    }

    $('#cy').hide();
    $('#navbar').hide();
    $('#sidebar').hide();
    $('#legend').hide();
    $('#table-div').show();
  });

  //guided tour via IntroJs
  $('#welcome-button, #guide-button').on('click', function() {
    $('#welcome-modal').hide();
    introJs().start();
  });

  //guided tour via IntroJs
  $('#about-button').on('click', function() {
    guide_1();
  });

  $('#welcome-checkbox').on('change', function() {
    if ($('#welcome-checkbox').is(':checked')) {
      document.cookie = "show-welcome=false";
    } else {
      document.cookie = "show-welcome=true";
    }
  });

  $('#close-welcome-button').on('click', function() {
    window.location.hash = '#index';
    $('#welcome-modal').hide();
  });

  //First time check with cookie
  if (document.cookie != "show-welcome=false") {
    $('#welcome-modal').show();
  }

  var hash = window.location.hash;
  setInterval(function(){
    if (window.location.hash != hash) {
      hash = window.location.hash;
      switch (hash) {
        case '#studies':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').show();
          $('#key-messages').hide();
          $('#table-div').hide();
          $('#guide-modal').hide();
          $('#overview-dummy').hide();
          break;
        case '#key-messages':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').hide();
          $('#key-messages').show();
          $('#table-div').hide();
          $('#guide-modal').hide();
          $('#overview-dummy').hide();
          break;
        case '#table':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').hide();
          $('#key-messages').hide();
          $('#table-div').show();
          $('#guide-modal').hide();
          $('#overview-dummy').hide();
          break;
        case '#overview':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').hide();
          $('#key-messages').hide();
          $('#table-div').hide();
          $('#guide-modal').hide();
          $('#overview-dummy').show();
          break;
        case '#guide':
          introJs().exit();
          $('#cy').hide();
          $('#navbar').hide();
          $('#sidebar').hide();
          $('#legend').hide();
          $('#studies-modal').hide();
          $('#key-messages').hide();
          $('#table-div').hide();
          $('#guide-modal').show();
          $('#overview-dummy').hide();
          break;
        default:
          $('#cy').show();
          $('#navbar').show();
          $('#sidebar').show();
          $('#legend').show();
          $('#studies-modal').hide();
          $('#key-messages').hide();
          $('#table-div').hide();
          $('#guide-modal').hide();
          $('#overview-dummy').hide();
      }
    }
  }, 100);

  window.location.hash = '#index';

}

request();
